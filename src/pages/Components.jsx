import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import Container from "../components/Container";
import Footer from "../components/Footer";

const tableHeaders = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];

const products = [
  { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
  { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
  { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" },
];

export default function Components() {
  return (
    <div>
      <PageHeader title="Components" breadcrumb={["Dashboard", "Components"]} />

      <div className="p-5 space-y-10">

        {/* 1. Basic Component - Button */}
        <section>
          <h2 className="text-lg font-bold mb-3">Button</h2>
          <div className="flex gap-2 flex-wrap">
            <Button type="primary">Primary</Button>
            <Button type="secondary">Secondary</Button>
            <Button type="success">Simpan</Button>
            <Button type="danger">Hapus</Button>
            <Button type="warning">Warning</Button>
          </div>
        </section>

        {/* 1. Basic Component - Badge */}
        <section>
          <h2 className="text-lg font-bold mb-3">Badge</h2>
          <div className="flex gap-2 flex-wrap">
            <Badge type="primary">Baru</Badge>
            <Badge type="secondary">Draft</Badge>
            <Badge type="success">Aktif</Badge>
            <Badge type="danger">Nonaktif</Badge>
            <Badge type="warning">Pending</Badge>
          </div>
        </section>

        {/* 1. Basic Component - Avatar */}
        <section>
          <h2 className="text-lg font-bold mb-3">Avatar</h2>
          <div className="flex gap-2">
            <Avatar name="Fikri" />
            <Avatar name="Hendra" />
            <Avatar name="Suci" />
          </div>
        </section>

        {/* 2. Layout Component - Container */}
        <section>
          <h2 className="text-lg font-bold mb-3">Container</h2>
          <Container className="bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Daftar Produk</h1>
            <p className="text-gray-600">Berikut adalah daftar produk terbaru.</p>
          </Container>
        </section>

        {/* 3. Data Display - Card */}
        <section>
          <h2 className="text-lg font-bold mb-3">Card</h2>
          <div className="max-w-sm">
            <Card>
              <h2 className="text-xl font-bold">Judul Card</h2>
              <p className="text-gray-600">Ini adalah isi dari card.</p>
            </Card>
          </div>
        </section>

        {/* 3. Data Display - ProductCard */}
        <section>
          <h2 className="text-lg font-bold mb-3">ProductCard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ProductCard
              image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              title="Sepatu Sport"
              category="Fashion"
              price="Rp 450.000"
              description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
              title="Smartphone"
              category="Elektronik"
              price="Rp 4.500.000"
              description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
            />
          </div>
        </section>

        {/* 3. Data Display - Table */}
        <section>
          <h2 className="text-lg font-bold mb-3">Table</h2>
          <Table headers={tableHeaders}>
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border px-4 py-3">{index + 1}</td>
                <td className="border px-4 py-3">{product.name}</td>
                <td className="border px-4 py-3">{product.category}</td>
                <td className="border px-4 py-3">{product.price}</td>
                <td className="border px-4 py-3">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        </section>

        {/* 2. Layout Component - Footer */}
        <section>
          <h2 className="text-lg font-bold mb-3">Footer</h2>
          <Footer />
        </section>

      </div>
    </div>
  );
}
