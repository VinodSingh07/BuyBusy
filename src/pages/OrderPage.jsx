import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(db, "users", user.uid, "orders");

    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      const ordersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-10">Please log in to view your orders.</p>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        📦 Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-md p-4">
              <h2 className="font-semibold text-lg mb-2">
                Order Date: {order.orderDate}
              </h2>
              <p className="text-gray-600 mb-4">
                Total: ₹{order.totalAmount.toFixed(2)}
              </p>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
