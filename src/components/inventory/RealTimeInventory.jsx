import { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Form, InputGroup, Row, Col, Alert, Modal, ProgressBar } from 'react-bootstrap';
import { 
  FaSearch, FaFilter, FaExclamationTriangle, FaPlus, FaMinus, 
  FaEdit, FaTrash, FaBell, FaSync, FaShoppingCart, FaClipboardCheck
} from 'react-icons/fa';

const RealTimeInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertItems, setAlertItems] = useState([]);

  // Sample inventory data (in a real app, this would come from an API)
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: 'Rice',
      category: 'grains',
      unit: 'kg',
      currentStock: 25,
      minStockLevel: 10,
      reorderLevel: 15,
      costPerUnit: 60,
      lastUpdated: '2023-11-05',
      expiryDate: '2024-05-10',
      location: 'Store Room A',
      supplier: 'ABC Suppliers',
      batchNumber: 'B12345',
      isTracked: true
    },
    {
      id: 2,
      name: 'Chicken',
      category: 'meat',
      unit: 'kg',
      currentStock: 8,
      minStockLevel: 5,
      reorderLevel: 10,
      costPerUnit: 220,
      lastUpdated: '2023-11-08',
      expiryDate: '2023-11-15',
      location: 'Freezer 1',
      supplier: 'Fresh Farms',
      batchNumber: 'C78901',
      isTracked: true
    },
    {
      id: 3,
      name: 'Tomatoes',
      category: 'vegetables',
      unit: 'kg',
      currentStock: 4,
      minStockLevel: 5,
      reorderLevel: 8,
      costPerUnit: 40,
      lastUpdated: '2023-11-09',
      expiryDate: '2023-11-16',
      location: 'Refrigerator 2',
      supplier: 'Green Gardens',
      batchNumber: 'V45678',
      isTracked: true
    },
    {
      id: 4,
      name: 'Flour',
      category: 'grains',
      unit: 'kg',
      currentStock: 15,
      minStockLevel: 8,
      reorderLevel: 12,
      costPerUnit: 45,
      lastUpdated: '2023-11-07',
      expiryDate: '2024-02-20',
      location: 'Store Room B',
      supplier: 'ABC Suppliers',
      batchNumber: 'F23456',
      isTracked: true
    },
    {
      id: 5,
      name: 'Onions',
      category: 'vegetables',
      unit: 'kg',
      currentStock: 12,
      minStockLevel: 8,
      reorderLevel: 10,
      costPerUnit: 30,
      lastUpdated: '2023-11-06',
      expiryDate: '2023-12-15',
      location: 'Store Room A',
      supplier: 'Green Gardens',
      batchNumber: 'V56789',
      isTracked: true
    },
    {
      id: 6,
      name: 'Cooking Oil',
      category: 'condiments',
      unit: 'liter',
      currentStock: 6,
      minStockLevel: 5,
      reorderLevel: 8,
      costPerUnit: 120,
      lastUpdated: '2023-11-04',
      expiryDate: '2024-04-10',
      location: 'Store Room B',
      supplier: 'Quality Foods',
      batchNumber: 'O34567',
      isTracked: true
    },
    {
      id: 7,
      name: 'Paneer',
      category: 'dairy',
      unit: 'kg',
      currentStock: 3,
      minStockLevel: 3,
      reorderLevel: 5,
      costPerUnit: 280,
      lastUpdated: '2023-11-09',
      expiryDate: '2023-11-14',
      location: 'Refrigerator 1',
      supplier: 'Dairy Fresh',
      batchNumber: 'D67890',
      isTracked: true
    }
  ]);

  // Sample recipe data
  const recipes = [
    {
      id: 1,
      name: 'Chicken Biryani',
      ingredients: [
        { itemId: 1, name: 'Rice', quantity: 0.2, unit: 'kg' },
        { itemId: 2, name: 'Chicken', quantity: 0.25, unit: 'kg' },
        { itemId: 5, name: 'Onions', quantity: 0.1, unit: 'kg' },
        { itemId: 6, name: 'Cooking Oil', quantity: 0.05, unit: 'liter' }
      ]
    },
    {
      id: 2,
      name: 'Paneer Butter Masala',
      ingredients: [
        { itemId: 7, name: 'Paneer', quantity: 0.2, unit: 'kg' },
        { itemId: 3, name: 'Tomatoes', quantity: 0.15, unit: 'kg' },
        { itemId: 5, name: 'Onions', quantity: 0.1, unit: 'kg' },
        { itemId: 6, name: 'Cooking Oil', quantity: 0.03, unit: 'liter' }
      ]
    }
  ];

  // Check for low stock items on component mount
  useEffect(() => {
    const lowStockItems = inventoryItems.filter(
      item => item.currentStock <= item.minStockLevel
    );
    
    if (lowStockItems.length > 0) {
      setAlertItems(lowStockItems);
      setShowAlertModal(true);
    }
  }, []);

  // Filter inventory items based on search term, category, and low stock filter
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesLowStock = !showLowStockOnly || item.currentStock <= item.minStockLevel;
    
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  // Get stock level badge color
  const getStockLevelBadge = (item) => {
    if (item.currentStock <= item.minStockLevel) {
      return <Badge bg="danger">Low Stock</Badge>;
    } else if (item.currentStock <= item.reorderLevel) {
      return <Badge bg="warning">Reorder Soon</Badge>;
    } else {
      return <Badge bg="success">In Stock</Badge>;
    }
  };

  // Calculate stock level percentage
  const calculateStockPercentage = (item) => {
    return (item.currentStock / (item.reorderLevel * 2)) * 100;
  };

  // Get progress bar variant based on stock level
  const getProgressVariant = (item) => {
    if (item.currentStock <= item.minStockLevel) {
      return 'danger';
    } else if (item.currentStock <= item.reorderLevel) {
      return 'warning';
    } else {
      return 'success';
    }
  };

  // Handle adding stock
  const handleAddStock = (itemId, quantity) => {
    setInventoryItems(
      inventoryItems.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              currentStock: item.currentStock + quantity,
              lastUpdated: new Date().toISOString().split('T')[0]
            } 
          : item
      )
    );
  };

  // Handle removing stock
  const handleRemoveStock = (itemId, quantity) => {
    setInventoryItems(
      inventoryItems.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              currentStock: Math.max(0, item.currentStock - quantity),
              lastUpdated: new Date().toISOString().split('T')[0]
            } 
          : item
      )
    );
  };

  // Handle edit item
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  // Handle save item
  const handleSaveItem = () => {
    if (selectedItem) {
      setInventoryItems(
        inventoryItems.map(item => 
          item.id === selectedItem.id ? selectedItem : item
        )
      );
    } else {
      // Add new item logic
      const newItem = {
        ...selectedItem,
        id: Math.max(...inventoryItems.map(item => item.id)) + 1,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setInventoryItems([...inventoryItems, newItem]);
    }
    setShowItemModal(false);
  };

  // Handle reorder
  const handleReorder = (item) => {
    setSelectedItem(item);
    setShowReorderModal(true);
  };

  // Handle confirm reorder
  const handleConfirmReorder = () => {
    // In a real app, this would send an order to the supplier
    alert(`Reorder placed for ${selectedItem.name}`);
    setShowReorderModal(false);
  };

  // Handle view recipe
  const handleViewRecipe = (item) => {
    setSelectedItem(item);
    setShowRecipeModal(true);
  };

  // Get unique categories for filter
  const categories = ['all', ...new Set(inventoryItems.map(item => item.category))];

  return (
    <>
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Real-Time Inventory Management</h5>
            <div className="d-flex gap-2">
              <Button variant="outline-primary" onClick={() => {
                setSelectedItem({
                  name: '',
                  category: 'grains',
                  unit: 'kg',
                  currentStock: 0,
                  minStockLevel: 0,
                  reorderLevel: 0,
                  costPerUnit: 0,
                  lastUpdated: new Date().toISOString().split('T')[0],
                  expiryDate: '',
                  location: '',
                  supplier: '',
                  batchNumber: '',
                  isTracked: true
                });
                setShowItemModal(true);
              }}>
                <FaPlus className="me-1" /> Add Item
              </Button>
              <Button variant="outline-secondary">
                <FaSync className="me-1" /> Sync Inventory
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={5}>
              <Form.Check
                type="switch"
                id="low-stock-switch"
                label="Show Low Stock Items Only"
                checked={showLowStockOnly}
                onChange={(e) => setShowLowStockOnly(e.target.checked)}
              />
            </Col>
          </Row>

          {alertItems.length > 0 && (
            <Alert variant="warning" className="d-flex align-items-center">
              <FaExclamationTriangle className="me-2" />
              <div>
                <strong>{alertItems.length} items are low in stock!</strong> Please reorder soon.
              </div>
              <Button 
                variant="outline-warning" 
                size="sm" 
                className="ms-auto"
                onClick={() => setShowAlertModal(true)}
              >
                View Details
              </Button>
            </Alert>
          )}

          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Stock Level</th>
                  <th>Unit</th>
                  <th>Cost</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                      <div><small className="text-muted">Batch: {item.batchNumber}</small></div>
                    </td>
                    <td>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="me-2">{item.currentStock} {item.unit}</span>
                        <ProgressBar 
                          now={calculateStockPercentage(item)} 
                          variant={getProgressVariant(item)}
                          style={{ height: '8px', width: '60px' }}
                        />
                      </div>
                    </td>
                    <td>{getStockLevelBadge(item)}</td>
                    <td>{item.unit}</td>
                    <td>₹{item.costPerUnit}/{item.unit}</td>
                    <td>{item.lastUpdated}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => handleAddStock(item.id, 1)}
                        >
                          <FaPlus />
                        </Button>
                        <Button 
                          variant="outline-warning" 
                          size="sm"
                          onClick={() => handleRemoveStock(item.id, 1)}
                          disabled={item.currentStock <= 0}
                        >
                          <FaMinus />
                        </Button>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleEditItem(item)}
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-info" 
                          size="sm"
                          onClick={() => handleViewRecipe(item)}
                        >
                          <FaClipboardCheck />
                        </Button>
                        {item.currentStock <= item.reorderLevel && (
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleReorder(item)}
                          >
                            <FaShoppingCart />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Item Modal */}
      <Modal
        show={showItemModal}
        onHide={() => setShowItemModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.id ? 'Edit Item' : 'Add New Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedItem.name}
                      onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={selectedItem.category}
                      onChange={(e) => setSelectedItem({...selectedItem, category: e.target.value})}
                    >
                      {categories.filter(c => c !== 'all').map((category, index) => (
                        <option key={index} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Stock</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={selectedItem.currentStock}
                      onChange={(e) => setSelectedItem({...selectedItem, currentStock: parseFloat(e.target.value)})}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Unit</Form.Label>
                    <Form.Select
                      value={selectedItem.unit}
                      onChange={(e) => setSelectedItem({...selectedItem, unit: e.target.value})}
                    >
                      <option value="kg">Kilogram (kg)</option>
                      <option value="g">Gram (g)</option>
                      <option value="liter">Liter</option>
                      <option value="ml">Milliliter (ml)</option>
                      <option value="piece">Piece</option>
                      <option value="packet">Packet</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cost Per Unit</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>₹</InputGroup.Text>
                      <Form.Control 
                        type="number" 
                        value={selectedItem.costPerUnit}
                        onChange={(e) => setSelectedItem({...selectedItem, costPerUnit: parseFloat(e.target.value)})}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Minimum Stock Level</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={selectedItem.minStockLevel}
                      onChange={(e) => setSelectedItem({...selectedItem, minStockLevel: parseFloat(e.target.value)})}
                    />
                    <Form.Text className="text-muted">
                      Alert will be triggered when stock falls below this level
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Reorder Level</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={selectedItem.reorderLevel}
                      onChange={(e) => setSelectedItem({...selectedItem, reorderLevel: parseFloat(e.target.value)})}
                    />
                    <Form.Text className="text-muted">
                      Reorder option will appear when stock falls below this level
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Supplier</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedItem.supplier}
                      onChange={(e) => setSelectedItem({...selectedItem, supplier: e.target.value})}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedItem.location}
                      onChange={(e) => setSelectedItem({...selectedItem, location: e.target.value})}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Batch Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedItem.batchNumber}
                      onChange={(e) => setSelectedItem({...selectedItem, batchNumber: e.target.value})}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={selectedItem.expiryDate}
                      onChange={(e) => setSelectedItem({...selectedItem, expiryDate: e.target.value})}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Check 
                  type="switch"
                  id="track-inventory"
                  label="Track this item in inventory"
                  checked={selectedItem.isTracked}
                  onChange={(e) => setSelectedItem({...selectedItem, isTracked: e.target.checked})}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowItemModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveItem}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Recipe Modal */}
      <Modal
        show={showRecipeModal}
        onHide={() => setShowRecipeModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Recipes Using {selectedItem?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              {recipes.filter(recipe => 
                recipe.ingredients.some(ingredient => ingredient.itemId === selectedItem.id)
              ).length > 0 ? (
                recipes.filter(recipe => 
                  recipe.ingredients.some(ingredient => ingredient.itemId === selectedItem.id)
                ).map(recipe => (
                  <Card key={recipe.id} className="mb-3">
                    <Card.Header>
                      <h6 className="mb-0">{recipe.name}</h6>
                    </Card.Header>
                    <Card.Body>
                      <p><strong>Ingredients:</strong></p>
                      <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className={ingredient.itemId === selectedItem.id ? 'fw-bold' : ''}>
                            {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                            {ingredient.itemId === selectedItem.id && ' (Selected Item)'}
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No recipes found using {selectedItem.name}</p>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRecipeModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reorder Modal */}
      <Modal
        show={showReorderModal}
        onHide={() => setShowReorderModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Reorder {selectedItem?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              <div className="mb-3">
                <p><strong>Current Stock:</strong> {selectedItem.currentStock} {selectedItem.unit}</p>
                <p><strong>Reorder Level:</strong> {selectedItem.reorderLevel} {selectedItem.unit}</p>
                <p><strong>Supplier:</strong> {selectedItem.supplier}</p>
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Quantity to Order</Form.Label>
                <Form.Control 
                  type="number" 
                  defaultValue={selectedItem.reorderLevel * 2 - selectedItem.currentStock}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Expected Delivery Date</Form.Label>
                <Form.Control 
                  type="date" 
                  defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  placeholder="Add any special instructions for the supplier"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReorderModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmReorder}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Low Stock Alert Modal */}
      <Modal
        show={showAlertModal}
        onHide={() => setShowAlertModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-warning text-dark">
          <Modal.Title>
            <FaBell className="me-2" /> Low Stock Alert
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The following items are running low on stock and need to be reordered:</p>
          <Table hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Current Stock</th>
                <th>Min Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {alertItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.currentStock} {item.unit}</td>
                  <td>{item.minStockLevel} {item.unit}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowAlertModal(false);
                        setShowReorderModal(true);
                      }}
                    >
                      Reorder
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlertModal(false)}>
            Close
          </Button>
          <Button 
            variant="warning"
            onClick={() => {
              setShowAlertModal(false);
              // In a real app, this would reorder all low stock items
              alert('Reorder placed for all low stock items');
            }}
          >
            Reorder All
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RealTimeInventory;
