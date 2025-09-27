import React, { useState, useEffect, useCallback } from 'react';
import config from '../constants';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [myRestaurant, setMyRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const restResponse = await manifest.from('Restaurant').find({ include: ['owner'] });
      setRestaurants(restResponse.data);

      if (user.role === 'owner') {
        const myRestResponse = await manifest.from('Restaurant').find({ filter: { owner_id: user.id } });
        if (myRestResponse.data.length > 0) {
          const ownerRestaurant = myRestResponse.data[0];
          setMyRestaurant(ownerRestaurant);
          const menuResponse = await manifest.from('MenuItem').find({ 
            filter: { restaurant_id: ownerRestaurant.id },
            sort: { createdAt: 'desc' }
          });
          setMenuItems(menuResponse.data);
        } else {
            setMyRestaurant(null);
            setMenuItems([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }, [manifest, user]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await manifest.from('Restaurant').create(data);
      e.target.reset();
      fetchAllData();
    } catch (error) {
      console.error('Failed to create restaurant', error);
      alert('Error: Could not create restaurant.');
    }
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    if (!myRestaurant) return;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.restaurant_id = myRestaurant.id;
    data.owner_id = user.id;
    try {
        await manifest.from('MenuItem').create(data);
        e.target.reset();
        fetchAllData();
    } catch (error) {
        console.error('Failed to add menu item', error);
        alert('Error: Could not add menu item.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">FoodieFind</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, <span className="font-semibold">{user.name}</span>!</span>
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 transition">Admin Panel</a>
            <button onClick={onLogout} className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user.role === 'owner' && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Restaurant Management</h2>
            {loading ? <p>Loading management tools...</p> : (
              !myRestaurant ? (
                <div>
                  <p className="text-gray-600 mb-4">You don't have a restaurant yet. Create one to get started!</p>
                  <form onSubmit={handleCreateRestaurant} className="space-y-4">
                     <input name="name" type="text" placeholder="Restaurant Name" required className="w-full p-2 border rounded-md" />
                     <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded-md"></textarea>
                     <input name="address" type="text" placeholder="Address" required className="w-full p-2 border rounded-md" />
                     <div><label className="text-sm text-gray-600">Cover Image</label><input name="coverImage" type="file" required className="w-full p-2 border rounded-md" /></div>
                     <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Create Restaurant</button>
                  </form>
                </div>
              ) : (
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Add Menu Item to {myRestaurant.name}</h3>
                    <form onSubmit={handleAddMenuItem} className="space-y-4 p-4 border rounded-md bg-gray-50">
                        <input name="name" type="text" placeholder="Item Name" required className="w-full p-2 border rounded-md" />
                        <textarea name="description" placeholder="Item Description" required className="w-full p-2 border rounded-md"></textarea>
                        <input name="price" type="number" step="0.01" placeholder="Price (USD)" required className="w-full p-2 border rounded-md" />
                        <div><label className="text-sm text-gray-600">Item Photo</label><input name="photo" type="file" className="w-full p-2 border rounded-md" /></div>
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Add Item</button>
                    </form>
                    <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Current Menu</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {menuItems.map(item => (
                            <div key={item.id} className="bg-white border rounded-lg p-4">
                                <h4 className="font-bold">{item.name}</h4>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                                <p className="text-green-600 font-semibold mt-2">${item.price}</p>
                            </div>
                        ))}
                        {menuItems.length === 0 && <p className="text-gray-500">No menu items yet.</p>}
                    </div>
                </div>
              )
            )}
          </div>
        )}

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Restaurants</h2>
        {loading ? <p>Loading restaurants...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map(r => (
              <div key={r.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                <img src={r.coverImage?.url || 'https://via.placeholder.com/400x300'} alt={r.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{r.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{r.description}</p>
                  <p className="text-xs text-gray-500">Owner: {r.owner?.name || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
