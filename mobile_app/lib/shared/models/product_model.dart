class ProductModel {
  final String productId;
  final String sellerId;
  final String name;
  final String description;
  final double price;
  final int stock;
  final List<String> variants;
  final List<String> images;
  final String category;
  final bool isApproved;
  final double rating;

  ProductModel({
    required this.productId,
    required this.sellerId,
    required this.name,
    required this.description,
    required this.price,
    required this.stock,
    required this.variants,
    required this.images,
    required this.category,
    required this.isApproved,
    required this.rating,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      productId: json['productId'] ?? '',
      sellerId: json['sellerId'] ?? '',
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      stock: json['stock'] ?? 0,
      variants: List<String>.from(json['variants'] ?? []),
      images: List<String>.from(json['images'] ?? []),
      category: json['category'] ?? 'Umum',
      isApproved: json['isApproved'] ?? false,
      rating: (json['rating'] as num?)?.toDouble() ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'productId': productId,
      'sellerId': sellerId,
      'name': name,
      'description': description,
      'price': price,
      'stock': stock,
      'variants': variants,
      'images': images,
      'category': category,
      'isApproved': isApproved,
      'rating': rating,
    };
  }

  ProductModel copyWith({
    String? productId,
    String? sellerId,
    String? name,
    String? description,
    double? price,
    int? stock,
    List<String>? variants,
    List<String>? images,
    String? category,
    bool? isApproved,
    double? rating,
  }) {
    return ProductModel(
      productId: productId ?? this.productId,
      sellerId: sellerId ?? this.sellerId,
      name: name ?? this.name,
      description: description ?? this.description,
      price: price ?? this.price,
      stock: stock ?? this.stock,
      variants: variants ?? this.variants,
      images: images ?? this.images,
      category: category ?? this.category,
      isApproved: isApproved ?? this.isApproved,
      rating: rating ?? this.rating,
    );
  }
}
