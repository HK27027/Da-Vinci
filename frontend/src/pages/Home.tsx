import { FiUsers, FiFileText, FiPlusCircle, FiEdit, FiTrash2, FiChevronRight } from "react-icons/fi";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            <span className="text-indigo-600">Kullanıcı & Gönderi Yöneticisi</span>'ne Hoş Geldiniz
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kullanıcıları ve gönderileri kolayca yönetin. İçerik oluşturun, görüntüleyin, güncelleyin ve silin; kullanıcılar ile gönderileri arasındaki ilişkileri keşfedin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Kullanıcılar</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Tüm kullanıcıları görüntüleyin ve yönetin. Yeni kullanıcı ekleyin, mevcut profilleri düzenleyin ve isim, kullanıcı adı, e-posta gibi bilgileri güncel tutun.
            </p>
            <a 
              href="/users" 
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Kullanıcıları Yönet
              <FiChevronRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Posts Card */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <FiFileText className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Gönderiler</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Tüm gönderileri görüntüleyin ve yönetin. Yeni içerik oluşturun, mevcut gönderileri düzenleyin ve gönderiler ile yazarları arasındaki ilişkiyi keşfedin.
            </p>
            <a 
              href="/posts" 
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Gönderileri Yönet
              <FiChevronRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Temel Özellikler</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 mx-auto mb-4">
                <FiPlusCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Oluştur</h4>
              <p className="text-gray-600 text-sm">Kolayca yeni kullanıcı ve gönderi ekleyin</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-4">
                <FiEdit className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Düzenle</h4>
              <p className="text-gray-600 text-sm">Mevcut içerikleri kolayca güncelleyin</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 p-3 rounded-lg w-12 h-12 mx-auto mb-4">
                <FiTrash2 className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Sil</h4>
              <p className="text-gray-600 text-sm">İstenmeyen içerikleri güvenle kaldırın</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;