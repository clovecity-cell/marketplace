class CourierLocation {
  final double latitude;
  final double longitude;
  final String address;

  CourierLocation({
    required this.latitude,
    required this.longitude,
    required this.address,
  });

  factory CourierLocation.fromJson(Map<String, dynamic> json) {
    return CourierLocation(
      latitude: (json['latitude'] as num?)?.toDouble() ?? 0.0,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 0.0,
      address: json['address'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'latitude': latitude,
      'longitude': longitude,
      'address': address,
    };
  }
}

class CourierModel {
  final String courierId;
  final String userId;
  final String vehicleType; // 'motorcycle', 'car', 'van'
  final CourierLocation currentLocation;
  final bool isActive;

  CourierModel({
    required this.courierId,
    required this.userId,
    required this.vehicleType,
    required this.currentLocation,
    required this.isActive,
  });

  factory CourierModel.fromJson(Map<String, dynamic> json) {
    return CourierModel(
      courierId: json['courierId'] ?? '',
      userId: json['userId'] ?? '',
      vehicleType: json['vehicleType'] ?? 'motorcycle',
      currentLocation: json['currentLocation'] != null
          ? CourierLocation.fromJson(json['currentLocation'])
          : CourierLocation(latitude: -6.2088, longitude: 106.8456, address: 'Jakarta Central'),
      isActive: json['isActive'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'courierId': courierId,
      'userId': userId,
      'vehicleType': vehicleType,
      'currentLocation': currentLocation.toJson(),
      'isActive': isActive,
    };
  }

  CourierModel copyWith({
    String? courierId,
    String? userId,
    String? vehicleType,
    CourierLocation? currentLocation,
    bool? isActive,
  }) {
    return CourierModel(
      courierId: courierId ?? this.courierId,
      userId: userId ?? this.userId,
      vehicleType: vehicleType ?? this.vehicleType,
      currentLocation: currentLocation ?? this.currentLocation,
      isActive: isActive ?? this.isActive,
    );
  }
}
