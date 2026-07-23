class UserModel {
  final String uid;
  final String name;
  final String email;
  final String phone;
  final List<String> roles; // ['buyer', 'seller', 'courier', 'admin']
  final double walletBalance;
  final String address;
  final bool isVerified;

  UserModel({
    required this.uid,
    required this.name,
    required this.email,
    required this.phone,
    required this.roles,
    required this.walletBalance,
    required this.address,
    required this.isVerified,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      uid: json['uid'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      phone: json['phone'] ?? '',
      roles: List<String>.from(json['roles'] ?? ['buyer']),
      walletBalance: (json['walletBalance'] as num?)?.toDouble() ?? 0.0,
      address: json['address'] ?? '',
      isVerified: json['isVerified'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'uid': uid,
      'name': name,
      'email': email,
      'phone': phone,
      'roles': roles,
      'walletBalance': walletBalance,
      'address': address,
      'isVerified': isVerified,
    };
  }

  UserModel copyWith({
    String? uid,
    String? name,
    String? email,
    String? phone,
    List<String>? roles,
    double? walletBalance,
    String? address,
    bool? isVerified,
  }) {
    return UserModel(
      uid: uid ?? this.uid,
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      roles: roles ?? this.roles,
      walletBalance: walletBalance ?? this.walletBalance,
      address: address ?? this.address,
      isVerified: isVerified ?? this.isVerified,
    );
  }
}
