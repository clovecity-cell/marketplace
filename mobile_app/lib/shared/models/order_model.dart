class OrderItem {
  final String productId;
  final String productName;
  final String variant;
  final int quantity;
  final double price;
  final String image;

  OrderItem({
    required this.productId,
    required this.productName,
    required this.variant,
    required this.quantity,
    required this.price,
    required this.image,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      productId: json['productId'] ?? '',
      productName: json['productName'] ?? '',
      variant: json['variant'] ?? '',
      quantity: json['quantity'] ?? 1,
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      image: json['image'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'productId': productId,
      'productName': productName,
      'variant': variant,
      'quantity': quantity,
      'price': price,
      'image': image,
    };
  }
}

class TrackingStep {
  final String status;
  final String description;
  final String timestamp;

  TrackingStep({
    required this.status,
    required this.description,
    required this.timestamp,
  });

  factory TrackingStep.fromJson(Map<String, dynamic> json) {
    return TrackingStep(
      status: json['status'] ?? '',
      description: json['description'] ?? '',
      timestamp: json['timestamp'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'status': status,
      'description': description,
      'timestamp': timestamp,
    };
  }
}

class OrderModel {
  final String orderId;
  final String buyerId;
  final String sellerId;
  final List<OrderItem> items;
  final double subtotal;
  final double shippingCost;
  final double platformFee;
  final double grandTotal;
  final String status; // 'pending', 'paid', 'processing', 'shipping', 'delivered', 'completed', 'cancelled'
  final List<TrackingStep> trackingHistory;

  OrderModel({
    required this.orderId,
    required this.buyerId,
    required this.sellerId,
    required this.items,
    required this.subtotal,
    required this.shippingCost,
    required this.platformFee,
    required this.grandTotal,
    required this.status,
    required this.trackingHistory,
  });

  factory OrderModel.fromJson(Map<String, dynamic> json) {
    return OrderModel(
      orderId: json['orderId'] ?? '',
      buyerId: json['buyerId'] ?? '',
      sellerId: json['sellerId'] ?? '',
      items: (json['items'] as List<dynamic>?)
              ?.map((item) => OrderItem.fromJson(item))
              .toList() ??
          [],
      subtotal: (json['subtotal'] as num?)?.toDouble() ?? 0.0,
      shippingCost: (json['shippingCost'] as num?)?.toDouble() ?? 0.0,
      platformFee: (json['platformFee'] as num?)?.toDouble() ?? 0.0,
      grandTotal: (json['grandTotal'] as num?)?.toDouble() ?? 0.0,
      status: json['status'] ?? 'pending',
      trackingHistory: (json['trackingHistory'] as List<dynamic>?)
              ?.map((step) => TrackingStep.fromJson(step))
              .toList() ??
          [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'orderId': orderId,
      'buyerId': buyerId,
      'sellerId': sellerId,
      'items': items.map((i) => i.toJson()).toList(),
      'subtotal': subtotal,
      'shippingCost': shippingCost,
      'platformFee': platformFee,
      'grandTotal': grandTotal,
      'status': status,
      'trackingHistory': trackingHistory.map((t) => t.toJson()).toList(),
    };
  }

  OrderModel copyWith({
    String? orderId,
    String? buyerId,
    String? sellerId,
    List<OrderItem>? items,
    double? subtotal,
    double? shippingCost,
    double? platformFee,
    double? grandTotal,
    String? status,
    List<TrackingStep>? trackingHistory,
  }) {
    return OrderModel(
      orderId: orderId ?? this.orderId,
      buyerId: buyerId ?? this.buyerId,
      sellerId: sellerId ?? this.sellerId,
      items: items ?? this.items,
      subtotal: subtotal ?? this.subtotal,
      shippingCost: shippingCost ?? this.shippingCost,
      platformFee: platformFee ?? this.platformFee,
      grandTotal: grandTotal ?? this.grandTotal,
      status: status ?? this.status,
      trackingHistory: trackingHistory ?? this.trackingHistory,
    );
  }
}
