// HomeScreen for Flutter Mobile App
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF2563EB),
        title: const Text('cocok.in Marketplace', style: TextStyle(fontWeight: FontWeight.bold)),
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAlignment.start,
          children: [
            // Banner Carousel
            Container(
              height: 160,
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                gradient: const LinearGradient(
                  colors: [Color(0xFF2563EB), Color(0xFF16A34A)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: const Padding(
                padding: EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('Promo Bebas Ongkir!', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                    SizedBox(height: 6),
                    Text('Gunakan Wallet cocok.in & nikmati diskon s/d 50%', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  ],
                ),
              ),
            ),

            // Category Grid
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Text('Kategori Pilihan', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 12),
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 3,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                _buildCategoryItem('Elektronik', Icons.smartphone),
                _buildCategoryItem('Fashion', Icons.checkroom),
                _buildCategoryItem('Kuliner', Icons.restaurant),
                _buildCategoryItem('Kecantikan', Icons.auto_awesome),
                _buildCategoryItem('Rumah', Icons.home),
                _buildCategoryItem('Hobi', Icons.sports_basketball),
              ],
            ),

            const SizedBox(height: 16),
            // AI Recommendation Banner
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: const [
                  Icon(Icons.auto_awesome, color: Color(0xFF2563EB)),
                  SizedBox(width: 8),
                  Text('Rekomendasi Spesial AI Gemini', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
            const SizedBox(height: 12),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryItem(String title, IconData icon) {
    return Column(
      children: [
        CircleAvatar(
          radius: 26,
          backgroundColor: const Color(0xFF2563EB).withOpacity(0.1),
          child: Icon(icon, color: const Color(0xFF2563EB)),
        ),
        const SizedBox(height: 6),
        Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
      ],
    );
  }
}
