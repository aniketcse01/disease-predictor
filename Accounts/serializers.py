from rest_framework import serializers
from .models import AppUser, PatientProfile, DoctorProfile
from django.contrib.auth import authenticate

class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ("id", "username", "email", "first_name", "last_name")

class PatientProfileSerializer(serializers.ModelSerializer):
    user = AppUserSerializer(read_only=True)
    class Meta:
        model = PatientProfile
        fields = ("id", "user", "age", "gender", "contact", "address")

class DoctorProfileSerializer(serializers.ModelSerializer):
    user = AppUserSerializer(read_only=True)
    class Meta:
        model = DoctorProfile
        # add experience so API returns it
        fields = ("id", "user", "specialization", "phone", "clinic_address", "experience")

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    role = serializers.ChoiceField(choices=[("patient","patient"), ("doctor","doctor")])
    # patient fields
    age = serializers.IntegerField(required=False)
    gender = serializers.CharField(required=False, allow_blank=True)
    contact = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    # doctor fields
    specialization = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    clinic_address = serializers.CharField(required=False, allow_blank=True)
    # NEW: optional experience for doctors
    experience = serializers.IntegerField(required=False, allow_null=True)

    def create(self, validated_data):
        role = validated_data.pop("role")
        username = validated_data.pop("username")
        password = validated_data.pop("password")
        email = validated_data.pop("email", None)

        # Pop doctor/patient-specific fields safely
        age = validated_data.pop("age", None)
        gender = validated_data.pop("gender", "")
        contact = validated_data.pop("contact", "")
        address = validated_data.pop("address", "")

        specialization = validated_data.pop("specialization", "")
        phone = validated_data.pop("phone", "")
        clinic_address = validated_data.pop("clinic_address", "")
        experience = validated_data.pop("experience", None)

        user = AppUser.objects.create_user(username=username, password=password, email=email)
        if role == "patient":
            PatientProfile.objects.create(
                user=user,
                age=age,
                gender=gender,
                contact=contact,
                address=address
            )
        else:
            DoctorProfile.objects.create(
                user=user,
                specialization=specialization,
                phone=phone,
                clinic_address=clinic_address,
                experience=experience
            )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data.get("username"), password=data.get("password"))
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        data["user"] = user
        return data
