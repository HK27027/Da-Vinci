import { useEffect, useState } from "react";
import { del, get, post, put } from "../utils/httpEntity.service";
import type { IModalMode, IPostModel, IUserModel } from "../utils/inteerfaces";
import { APIURLS } from "../utils/APIURLS";
import { FiFileText, FiCheckCircle, FiZap } from "react-icons/fi";
import toast from "react-hot-toast";


function Posts() {
  const [posts, setPosts] = useState<IPostModel[]>([]);
  const [users, setUsers] = useState<IUserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<IPostModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string>("all");
  const [modalMode, setModalMode] = useState<IModalMode>('view');
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: ''
  });

  const getUsers = async () => {
    try {
      Promise.all([
        get(APIURLS.USERS)
      ])
        .then(([usersRes]) => {
          setUsers(usersRes.data);
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("user çekme hatası", err);
    }
  };
  const getPosts = async () => {
    try {
      Promise.all([
        get(APIURLS.POSTS)
      ])
        .then(([postsRes]) => {
          setPosts(postsRes.data);
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("post çekme hatası", err);
    }
  }

  useEffect(() => {
    getUsers();
    getPosts();
  }, []);

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = selectedUserId === "all" || post.userId === parseInt(selectedUserId);
    return matchesSearch && matchesUser;
  });

  const handlePostClick = (post: IPostModel) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleAddPost = () => {
    setSelectedPost(null);
    setFormData({ title: '', body: '', userId: '' });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditPost = (post: IPostModel) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      body: post.body,
      userId: post.userId.toString()
    });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeletePost = (post: IPostModel) => {
    setSelectedPost(post);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        userId: parseInt(formData.userId)
      };

      if (modalMode === 'add') {
        const response = await post(APIURLS.POSTS, postData);
        if (response && response.data) {
          toast.success('Post eklendi!');
          getPosts();
        }

      } else if (modalMode === 'edit' && selectedPost) {
        const response = await put(`${APIURLS.POSTS}/${selectedPost.id}`, postData);
        if (response && response.data) {
          toast.success('Post Güncellendi!');
          getPosts();
        }
      } else if (modalMode === 'delete' && selectedPost) {
        await del(`${APIURLS.POSTS}/${selectedPost.id}`);

        toast.success("Post Silindi!");
        getPosts();

      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const renderModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {modalMode === 'view' && "Gönderi Detayları"}
            {modalMode === 'add' && "Yeni Gönderi Ekle"}
            {modalMode === 'edit' && "Gönderi Düzenle"}
            {modalMode === 'delete' && "Gönderi Sil"}
          </h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {modalMode === 'delete' ? (
          <div className="space-y-4">
            <p className="text-gray-700">Bu gönderiyi silmek istediğinizden emin misiniz?</p>
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
            {selectedPost && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700">Post ID</label>
                  <p className="text-gray-900">{selectedPost.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Başlık</label>
                  <p className="text-gray-900">{selectedPost.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">İçerik</label>
                  <p className="text-gray-900">{selectedPost.body}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Yazar</label>
                  <p className="text-gray-900">{getUserName(selectedPost.userId)}</p>
                </div>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Başlık</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">İçerik</label>
              <textarea
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Yazar</label>
              <select
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              >
                <option value="">Yazar Seçin</option>
                {users.map(user => (
                  <option key={user.id} value={user.id.toString()}>
                    {user.name}
                  </option>
                ))}
              </select>
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
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                {modalMode === 'add' ? 'Ekle' : 'Güncelle'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gönderi Yönetimi</h1>
              <p className="text-gray-600 mt-2">Tüm gönderileri ve kullanıcı ilişkilerini yönetin</p>
            </div>
            <button
              onClick={handleAddPost}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Yeni Gönderi Ekle
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Başlığa göre gönderi ara..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="all">Tüm Kullanıcılar</option>
              {users.map(user => (
                <option key={user.id} value={user.id.toString()}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiFileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{posts.length}</p>
                <p className="text-gray-600">Toplam Gönderi</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
                <p className="text-gray-600">Aktif Yazar</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiCheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{filteredPosts.length}</p>
                <p className="text-gray-600">Filtre Sonucu</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FiZap className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{users.length > 0 ? Math.round(posts.length / users.length) : 0}</p>
                <p className="text-gray-600">Ort. Gönderi/Kullanıcı</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tüm Gönderiler</h2>
            <div className="grid gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                          {post.id}
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                            Gönderi #{post.id}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {getUserName(post.userId)} tarafından
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2 leading-tight">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        User ID: {post.userId}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditPost(post);
                        }}
                        className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePost(post);
                        }}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Gönderi bulunamadı</h3>
                  <p className="text-gray-500">Arama terimlerinizi veya filtreleri değiştirin.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Kullanıcı-Gönderi İlişkileri</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => {
              const userPosts = posts.filter(post => post.userId === user.id);
              return (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600">{userPosts.length}</span>
                      <p className="text-xs text-gray-500">gönderi</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isModalOpen && renderModal()}
    </div>
  );
}

export default Posts;