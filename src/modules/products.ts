import { getData } from '../services/api';
import { generateCSV, downloadCSV } from '../services/reports';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  // Add other properties as needed
}

interface StockInfo {
  productId: number;
  quantity: number;
  // Add other properties as needed
}

export async function getValidProducts(): Promise<void> {
  try {
    const allProducts = await getData('products', []) as Product[];
    
    const invalidProducts = allProducts.filter(product => 
      product.price <= 0 || !product.images || product.images.length === 0
    );

    if (invalidProducts.length > 0) {
      const reportData = invalidProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        hasImages: product.images && product.images.length > 0 ? 'Yes' : 'No',
        invalidReason: product.price <= 0 ? 'Invalid Price' : 'No Images'
      }));

      const csvContent = generateCSV(reportData);
      downloadCSV(csvContent, 'invalid_products.csv');
      console.log('Invalid products report generated and downloaded.');
    } else {
      console.log('All products are valid.');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export async function checkProductStockAndGenerateReport(): Promise<void> {
  // ... (rest of the function remains unchanged)
}