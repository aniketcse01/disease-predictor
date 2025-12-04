# Accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer, AppUserSerializer, DoctorProfileSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.authentication import TokenAuthentication

# DRF generics for the doctors list view
from rest_framework.generics import ListAPIView
from .models import DoctorProfile

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        ser = RegisterSerializer(data=request.data)
        if ser.is_valid():
            user = ser.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "username": user.username}, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    ser = LoginSerializer(data=request.data)
    if ser.is_valid():
        user = ser.validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.username})
    return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def me(request):
    """
    Returns the serialized current user.
    Requires Token authentication: send header `Authorization: Token <token>`
    """
    user = request.user
    return Response(AppUserSerializer(user).data)

# -------------------------
# New: Read-only list endpoint for doctors (safe)
# URL: /api/accounts/doctors/?specialization=Radiologist
# If specialization param is empty or "All" -> returns all doctors
# Uses your existing DoctorProfile model and DoctorProfileSerializer
# -------------------------
class DoctorListView(ListAPIView):
    """
    Returns a list of doctors. Optional query param:
      - specialization (string): filters doctors by specialization (icontains)
    """
    serializer_class = DoctorProfileSerializer
    queryset = DoctorProfile.objects.all()

    def get_queryset(self):
        qs = super().get_queryset()
        specialization = self.request.query_params.get("specialization", "").strip()
        if specialization and specialization.lower() != "all":
            # filter by specialization field (case-insensitive contains)
            qs = qs.filter(specialization__icontains=specialization)
        return qs
