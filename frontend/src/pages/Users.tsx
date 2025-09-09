import { useEffect, useState } from "react";
import { del, get, post, put } from "../utils/httpEntity.service";
import type { IModalMode, IUserModel } from "../utils/inteerfaces";
import { APIURLS } from "../utils/APIURLS";
import { FiPlus, FiSearch, FiUser, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";


function Users() {
  const [users, setUsers] = useState<IUserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<IUserModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalMode, setModalMode] = useState<IModalMode>('view');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  });

  const getUser = async () => {
    try {
      const res = await get(APIURLS.USERS);
      setUsers(res.data);
      setLoading(false)
    } catch (exx) {
      setLoading(false)
      console.error("kullanıcı çekilirken hata oluştu", exx);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const searchUsers = async (term: string) => {
    try {
      const res = await get(`${APIURLS.USERS}/search?term=${encodeURIComponent(term)}`);
      console.log("Arama sonuçları:", res);
      setUsers(res.data);
    } catch (err) {
      console.error("Arama yapılırken hata oluştu", err);
      toast.error('Arama sırasında bir hata oluştu!');
    }
  };

  useEffect(() => {
    if(searchTerm===""){
      getUser();
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      searchUsers(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleUserClick = (user: IUserModel) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormData({ name: '', username: '', email: '' });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditUser = (user: IUserModel) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email
    });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user: IUserModel) => {
    setSelectedUser(user);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        const response = await post(APIURLS.USERS, formData);
        if (response && response.data) {
          toast.success('Kullanıcı  Eklendi!');
          getUser();
        }
      } else if (modalMode === 'edit' && selectedUser) {
        const response = await put(`${APIURLS.USERS}/${selectedUser.id}`, formData);
        if (response && response.data) {

          toast.success('Kullanıcı Güncellendi!');
          getUser();
        }

      } else if (modalMode === 'delete' && selectedUser) {
        await del(`${APIURLS.USERS}/${selectedUser.id}`);

        toast.success('Kullanıcı Silindi!');
        getUser();


      }
      setIsModalOpen(false);
    } catch (error) {
       toast.error('Bir hata oluştu!');
      console.error("Error handling user:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
              <p className="text-gray-600 mt-2">Sistemdeki tüm kullanıcıları yönetin</p>
            </div>
            <button
              onClick={handleAddUser}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Yeni Kullanıcı Ekle
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Kullanıcı adı, e-posta veya kullanıcı adı ile ara..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiUser className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
                <p className="text-gray-600">Toplam Kullanıcı</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
                <p className="text-gray-600">Aktif Kullanıcı</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
                <p className="text-gray-600">Arama Sonucu</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tüm Kullanıcılar</h2>
            <div className="grid gap-4">
              {users&& users?.map((user) => (
                <div
                  key={user.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-gray-600">@{user.username}</p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditUser(user);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user);
                        }}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {modalMode === 'view' && "Kullanıcı Detayları"}
                {modalMode === 'add' && "Yeni Kullanıcı Ekle"}
                {modalMode === 'edit' && "Kullanıcı Düzenle"}
                {modalMode === 'delete' && "Kullanıcı Sil"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {modalMode === 'delete' ? (
              <div className="space-y-4">
                <p className="text-gray-700">Bu kullanıcıyı silmek istediğinizden emin misiniz?</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ) : modalMode === 'view' ? (
              <div className="space-y-3">
                {selectedUser && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700">ID</label>
                      <p className="text-gray-900">{selectedUser.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Ad</label>
                      <p className="text-gray-900">{selectedUser.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Kullanıcı Adı</label>
                      <p className="text-gray-900">{selectedUser.username}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">E-posta</label>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ad</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">E-posta</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    {modalMode === 'add' ? 'Ekle' : 'Güncelle'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;