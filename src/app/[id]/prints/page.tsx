"use client";

import React, { useState } from "react";

interface Template {
  id: string;
  name: string;
  frontUrl: string;
  backUrl: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  templates: Template[];
}

interface UserInfo {
  studentName: string;
  parentGuardian: string;
  address: string;
  contact: string;
  school: string;
}

interface ProductSelectorProps {
  products: Product[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
  };
}

const defaultUserInfo: UserInfo = {
  studentName: "",
  parentGuardian: "",
  address: "",
  contact: "",
  school: "",
};

const ProductSelector: React.FC<ProductSelectorProps> = ({ products, colors }) => {
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [selectedTemplates, setSelectedTemplates] = useState<{ [productId: string]: string }>(
    () => Object.fromEntries(products.map((p) => [p.id, p.templates[0]?.id || ""]))
  );
  const [showBack, setShowBack] = useState<{ [productId: string]: boolean }>({});
  const [userInfos, setUserInfos] = useState<{ [productId: string]: UserInfo }>(
    () => Object.fromEntries(products.map((p) => [p.id, { ...defaultUserInfo }]))
  );

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const handleTemplateChange = (productId: string, templateId: string) => {
    setSelectedTemplates((prev) => ({
      ...prev,
      [productId]: templateId,
    }));
  };

  const handleToggleSide = (productId: string) => {
    setShowBack((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleUserInfoChange = (
    productId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInfos((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const total = products.reduce(
    (sum, p) => sum + (quantities[p.id] || 0) * p.price,
    0
  );

  const handleSubmit = () => {
    alert(
      `Order submitted!\n\nProducts: ${JSON.stringify(
        quantities
      )}\n\nTemplates: ${JSON.stringify(selectedTemplates)}\n\nUser Info: ${JSON.stringify(
        userInfos
      )}\n\nTotal: ₱${total.toFixed(2)}`
    );
  };

  return (
    <div
      style={{ background: colors.background, color: colors.textPrimary }}
      className="p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
        Order Your Printable Items
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {products.map((product) => {
          const selectedTemplate =
            product.templates.find((t) => t.id === selectedTemplates[product.id]) ||
            product.templates[0];
          const isBack = showBack[product.id] || false;
          const userInfo = userInfos[product.id] || defaultUserInfo;
          return (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col items-center"
              style={{ borderColor: colors.accent, background: colors.secondary }}
            >
              <div className="mb-2 font-semibold">{product.name}</div>
              <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                {product.description}
              </div>
              {/* Template selection */}
              <div className="mb-2 w-full">
                <label className="block mb-1 font-medium" style={{ color: colors.primary }}>
                  Choose Template:
                </label>
                <select
                  className="w-full p-1 rounded border"
                  style={{
                    borderColor: colors.accent,
                    color: colors.textPrimary,
                    background: colors.secondary,
                  }}
                  value={selectedTemplates[product.id]}
                  onChange={(e) => handleTemplateChange(product.id, e.target.value)}
                >
                  {product.templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Template preview */}
              <div className="mb-2 w-full flex flex-col items-center">
                <img
                  src={
                    isBack
                      ? selectedTemplate?.backUrl
                      : selectedTemplate?.frontUrl
                  }
                  alt={selectedTemplate?.name}
                  className="rounded border mb-1"
                  style={{
                    maxWidth: 220,
                    maxHeight: 180,
                    borderColor: colors.accent,
                    background: "#fff",
                  }}
                />
                <button
                  type="button"
                  className="text-xs underline"
                  style={{ color: colors.accent }}
                  onClick={() => handleToggleSide(product.id)}
                >
                  {isBack ? "Show Front" : "Show Back"}
                </button>
              </div>
              {/* User info form */}
              <div className="mb-2 w-full space-y-1">
                <input
                  type="text"
                  name="studentName"
                  placeholder="Student Name"
                  value={userInfo.studentName}
                  onChange={(e) => handleUserInfoChange(product.id, e)}
                  className="w-full p-1 rounded border"
                  style={{
                    borderColor: colors.accent,
                    color: colors.textPrimary,
                    background: colors.background,
                  }}
                />
                <input
                  type="text"
                  name="parentGuardian"
                  placeholder="Parent/Guardian"
                  value={userInfo.parentGuardian}
                  onChange={(e) => handleUserInfoChange(product.id, e)}
                  className="w-full p-1 rounded border"
                  style={{
                    borderColor: colors.accent,
                    color: colors.textPrimary,
                    background: colors.background,
                  }}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userInfo.address}
                  onChange={(e) => handleUserInfoChange(product.id, e)}
                  className="w-full p-1 rounded border"
                  style={{
                    borderColor: colors.accent,
                    color: colors.textPrimary,
                    background: colors.background,
                  }}
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact #"
                  value={userInfo.contact}
                  onChange={(e) => handleUserInfoChange(product.id, e)}
                  className="w-full p-1 rounded border"
                  style={{
                    borderColor: colors.accent,
                    color: colors.textPrimary,
                    background: colors.background,
                  }}
                />
                <input
                  type="text"
                  name="school"
                  placeholder="School (optional)"
                  value={userInfo.school}
                  onChange={(e) => handleUserInfoChange(product.id, e)}
                  className="w-full p-1 rounded border"
                  style={{
                    borderColor: colors.accent,
                    color: colors.textPrimary,
                    background: colors.background,
                  }}
                />
              </div>
              <div className="mb-2 font-bold" style={{ color: colors.accent }}>
                ₱{product.price.toFixed(2)}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="px-2 py-1 rounded bg-gray-200"
                  style={{ color: colors.primary }}
                >
                  -
                </button>
                <span>{quantities[product.id] || 0}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="px-2 py-1 rounded bg-gray-200"
                  style={{ color: colors.primary }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mb-4 text-lg font-semibold">
        Total: <span style={{ color: colors.accent }}>₱{total.toFixed(2)}</span>
      </div>
      <button
        type="button"
        className="w-full py-2 rounded font-bold"
        style={{ background: colors.accent, color: colors.textPrimary }}
        onClick={handleSubmit}
      >
        Submit Order
      </button>
    </div>
  );
};

// Example products with templates (front/back)
const products: Product[] = [
  {
    id: "1",
    name: "School Name Tag",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80",
    price: 50,
    description: "Personalized school name tag.",
    templates: [
      {
        id: "nt1",
        name: "Classic Blue",
        frontUrl: "https://i.pinimg.com/1200x/7e/7e/70/7e7e70e4c939dbe1a75d3f9a56e3212a.jpg",
        backUrl: "https://dummyimage.com/384x720/64748b/f8fafc&text=Name+Tag+Back+1",
      },
      {
        id: "nt2",
        name: "Modern Red",
        frontUrl: "https://dummyimage.com/384x720/ef4444/f8fafc&text=Name+Tag+Front+2",
        backUrl: "https://dummyimage.com/384x720/1e293b/f8fafc&text=Name+Tag+Back+2",
      },
    ],
  },
  {
    id: "2",
    name: "Bag Tag",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80",
    price: 70,
    description: "Durable bag tag with custom info.",
    templates: [
      {
        id: "bt1",
        name: "Fun Green",
        frontUrl: "https://dummyimage.com/324x204/22c55e/f8fafc&text=Bag+Tag+Front+1",
        backUrl: "https://dummyimage.com/324x204/1e293b/f8fafc&text=Bag+Tag+Back+1",
      },
      {
        id: "bt2",
        name: "Bright Yellow",
        frontUrl: "https://dummyimage.com/324x204/facc15/1e293b&text=Bag+Tag+Front+2",
        backUrl: "https://dummyimage.com/324x204/ef4444/f8fafc&text=Bag+Tag+Back+2",
      },
    ],
  },
];

const brandingColors = {
  primary: "#1E293B",
  secondary: "#F8FAFC",
  accent: "#EF4444",
  background: "#E2E8F0",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
};

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: brandingColors.background }}>
      <ProductSelector products={products} colors={brandingColors} />
    </div>
  );
};

export default Page;