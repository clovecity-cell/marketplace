// SearchScreen for Flutter Mobile App
import 'package:flutter/material.dart';

class SearchScreen extends StatelessWidget {
  const SearchScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        title: TextField(
          decoration: InputDecoration(
            hintText: 'Cari produk di cocok.in...',
            border: InputBorder.none,
            prefixIcon: const Icon(Icons.search, color: Color(0xFF2563EB)),
            suffixIcon: IconButton(
              icon: const Icon(Icons.tune, color: Color(0xFF16A34A)),
              onPressed: () {
                // Filter modal with price & rating
              },
            ),
          ),
        ),
      ),
      body: const Center(
        child: Text('Hasil Pencarian dengan Filter Harga & Rating'),
      ),
    );
  }
}
