import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Table, Badge, InputGroup } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const MenuManagement = () => {
  const [showItemModal, setShowItemModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample menu categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'Starters', itemCount: 8 },
    { id: 2, name: 'Main Course', itemCount: 12 },
    { id: 3, name: 'Rice & Breads', itemCount: 6 },
    { id: 4, name: 'Desserts', itemCount: 5 },
    { id: 5, name: 'Beverages', itemCount: 7 },
  ]);

  // Sample menu items
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Paneer Tikka', category: 'Starters', price: 220, veg: true, available: true, popular: true },
    { id: 2, name: 'Chicken 65', category: 'Starters', price: 250, veg: false, available: true, popular: true },
    { id: 3, name: 'Veg Manchurian', category: 'Starters', price: 180, veg: true, available: true, popular: false },
    { id: 4, name: 'Butter Chicken', category: 'Main Course', price: 320, veg: false, available: true, popular: true },
    { id: 5, name: 'Paneer Butter Masala', category: 'Main Course', price: 280, veg: true, available: true, popular: true },
    { id: 6, name: 'Dal Makhani', category: 'Main Course', price: 220, veg: true, available: true, popular: false },
    { id: 7, name: 'Jeera Rice', category: 'Rice & Breads', price: 150, veg: true, available: true, popular: false },
    { id: 8, name: 'Butter Naan', category: 'Rice & Breads', price: 40, veg: true, available: true, popular: true },
    { id: 9, name: 'Gulab Jamun', category: 'Desserts', price: 80, veg: true, available: true, popular: true },
    { id: 10, name: 'Ice Cream', category: 'Desserts', price: 120, veg: true, available: false, popular: false },
    { id: 11, name: 'Soft Drink', category: 'Beverages', price: 60, veg: true, available: true, popular: false },
    { id: 12, name: 'Masala Chai', category: 'Beverages', price: 40, veg: true, available: true, popular: true },
  ]);

  // Sample add-ons
  const [addons, setAddons] = useState([
    { id: 1, name: 'Extra Cheese', price: 30, applicable: ['Main Course', 'Starters'] },
    { id: 2, name: 'Extra Spicy', price: 10, applicable: ['Main Course', 'Starters'] },
    { id: 3, name: 'Extra Butter', price: 20, applicable: ['Main Course', 'Rice & Breads'] },
    { id: 4, name: 'Ice', price: 5, applicable: ['Beverages'] },
    { id: 5, name: 'Whipped Cream', price: 25, applicable: ['Desserts'] },
  ]);

  const handleAddItem = () => {
    setEditMode(false);
    setSelectedItem(null);
    setShowItemModal(true);
  };

  const handleEditItem = (item) => {
    setEditMode(true);
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleAddCategory = () => {
    setShowCategoryModal(true);
  };

  const handleAddAddon = () => {
    setShowAddonModal(true);
  };

  const handleToggleAvailability = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const handleSaveItem = () => {
    // Save item logic would go here
    setShowItemModal(false);
    if (!editMode) {
      alert('Menu item added successfully!');
    } else {
      alert('Menu item updated successfully!');
    }
  };

  const handleSaveCategory = () => {
    // Save category logic would go here
    setShowCategoryModal(false);
    alert('Category added successfully!');
  };

  const handleSaveAddon = () => {
    // Save addon logic would go here
    setShowAddonModal(false);
    alert('Add-on added successfully!');
  };

  const filteredItems = searchTerm 
    ? menuItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : menuItems;

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Menu Management</h5>
                <div>
                  <Button variant="outline-primary" className="me-2" onClick={handleAddCategory}>
                    <FaPlus className="me-1" /> Add Category
                  </Button>
                  <Button variant="outline-success" className="me-2" onClick={handleAddAddon}>
                    <FaPlus className="me-1" /> Add Add-on
                  </Button>
                  <Button variant="primary" onClick={handleAddItem}>
                    <FaPlus className="me-1" /> Add Menu Item
                  </Button>
                </div>
              </div>

              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control 
                  placeholder="Search menu items..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Availability</th>
                    <th>Popular</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>₹{item.price}</td>
                      <td>
                        <Badge bg={item.veg ? 'success' : 'danger'}>
                          {item.veg ? 'Veg' : 'Non-Veg'}
                        </Badge>
                      </td>
                      <td>
                        <Button 
                          variant={item.available ? 'outline-success' : 'outline-danger'} 
                          size="sm"
                          onClick={() => handleToggleAvailability(item.id)}
                        >
                          {item.available ? <FaToggleOn /> : <FaToggleOff />}
                        </Button>
                      </td>
                      <td>
                        {item.popular && <Badge bg="warning">Popular</Badge>}
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleEditItem(item)}>
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Categories</h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Items</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>{category.itemCount}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-1">
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Add-ons & Modifiers</h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Applicable To</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {addons.map(addon => (
                    <tr key={addon.id}>
                      <td>{addon.name}</td>
                      <td>₹{addon.price}</td>
                      <td>
                        {addon.applicable.map((cat, idx) => (
                          <Badge key={idx} bg="secondary" className="me-1">{cat}</Badge>
                        ))}
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-1">
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Menu Item Modal */}
      <Modal show={showItemModal} onHide={() => setShowItemModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Menu Item' : 'Add Menu Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter item name" 
                defaultValue={selectedItem?.name || ''}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select defaultValue={selectedItem?.category || ''}>
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter price" 
                defaultValue={selectedItem?.price || ''}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Veg"
                  name="foodType"
                  id="veg"
                  defaultChecked={selectedItem?.veg || true}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Non-Veg"
                  name="foodType"
                  id="nonveg"
                  defaultChecked={selectedItem ? !selectedItem.veg : false}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Available"
                defaultChecked={selectedItem?.available || true}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Mark as Popular"
                defaultChecked={selectedItem?.popular || false}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Enter item description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Applicable Add-ons</Form.Label>
              {addons.map(addon => (
                <Form.Check
                  key={addon.id}
                  type="checkbox"
                  label={`${addon.name} (+₹${addon.price})`}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowItemModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveItem}>
            {editMode ? 'Update Item' : 'Add Item'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Category Modal */}
      <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Display Order</Form.Label>
              <Form.Control type="number" placeholder="Enter display order" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCategoryModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Add-on Modal */}
      <Modal show={showAddonModal} onHide={() => setShowAddonModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Add-on</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Add-on Name</Form.Label>
              <Form.Control type="text" placeholder="Enter add-on name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control type="number" placeholder="Enter price" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Applicable Categories</Form.Label>
              {categories.map(category => (
                <Form.Check
                  key={category.id}
                  type="checkbox"
                  label={category.name}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddonModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAddon}>
            Add Add-on
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MenuManagement;
