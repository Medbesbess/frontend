import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import ServiceDetailsModal from "./ServiceDetailsModal";

const BrowseCategories = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("Plumbing");
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch categories and services on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/my-categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/my-services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchCategories();
    fetchServices();
  }, []);

  // Update active category from navbar navigation
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setActiveCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  // Filter services based on active category
  useEffect(() => {
    const filtered = services.filter(
      (service) => service.category.name === activeCategory
    );
    setFilteredServices(filtered);
  }, [services, activeCategory]);

  // Handle service click to open the modal
  const handleServiceClick = async (serviceId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/my-services/${serviceId}`
      );
      const serviceDetails = await response.json();
      setSelectedService(serviceDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  return (
    <div className="py-16 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-2">
          Browse by category
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Explore our diverse range of services tailored to your needs.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`px-8 py-2 rounded-full transition-all duration-200 text-lg ${
                activeCategory === category.name
                  ? "bg-blue-100 text-blue-900 font-medium"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              } border border-gray-200`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <CategoryCard
              key={service.id}
              title={service.name}
              image={service.image}
              onClick={() => handleServiceClick(service.id)} // Pass click handler
            />
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <ServiceDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};

export default BrowseCategories;
