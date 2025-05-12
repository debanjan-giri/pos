import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Table, Badge, InputGroup, Tab, Nav } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUserCog, FaCalendarAlt, FaMoneyBillAlt, FaChartLine, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';

const Staff = () => {
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [activeTab, setActiveTab] = useState('staff');

  // Sample staff data
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Manager', phone: '9876543210', email: 'john@example.com', status: 'active', joiningDate: '2022-01-15' },
    { id: 2, name: 'Jane Smith', role: 'Waiter', phone: '8765432109', email: 'jane@example.com', status: 'active', joiningDate: '2022-03-10' },
    { id: 3, name: 'Robert Johnson', role: 'Waiter', phone: '7654321098', email: 'robert@example.com', status: 'active', joiningDate: '2022-05-20' },
    { id: 4, name: 'Emily Davis', role: 'Cashier', phone: '6543210987', email: 'emily@example.com', status: 'active', joiningDate: '2022-02-05' },
    { id: 5, name: 'Michael Wilson', role: 'Chef', phone: '5432109876', email: 'michael@example.com', status: 'active', joiningDate: '2022-01-20' },
    { id: 6, name: 'Sarah Thompson', role: 'Waiter', phone: '4321098765', email: 'sarah@example.com', status: 'inactive', joiningDate: '2022-04-15' },
  ]);

  // Sample roles data
  const [roles, setRoles] = useState([
    { id: 1, name: 'Manager', permissions: ['all'] },
    { id: 2, name: 'Cashier', permissions: ['billing', 'reports_view', 'customer_view'] },
    { id: 3, name: 'Waiter', permissions: ['billing', 'tables'] },
    { id: 4, name: 'Chef', permissions: ['kitchen', 'inventory_view'] },
  ]);

  // Sample attendance data
  const [attendance, setAttendance] = useState([
    { id: 1, staff: 'John Doe', date: '2023-11-05', checkIn: '09:00', checkOut: '18:00', status: 'present', hours: 9 },
    { id: 2, staff: 'Jane Smith', date: '2023-11-05', checkIn: '09:15', checkOut: '18:30', status: 'present', hours: 9.25 },
    { id: 3, staff: 'Robert Johnson', date: '2023-11-05', checkIn: '09:05', checkOut: '18:15', status: 'present', hours: 9.17 },
    { id: 4, staff: 'Emily Davis', date: '2023-11-05', checkIn: '09:30', checkOut: '18:45', status: 'present', hours: 9.25 },
    { id: 5, staff: 'Michael Wilson', date: '2023-11-05', checkIn: '08:45', checkOut: '17:30', status: 'present', hours: 8.75 },
    { id: 6, staff: 'Sarah Thompson', date: '2023-11-05', checkIn: '', checkOut: '', status: 'absent', hours: 0 },
    { id: 7, staff: 'John Doe', date: '2023-11-04', checkIn: '09:00', checkOut: '18:00', status: 'present', hours: 9 },
    { id: 8, staff: 'Jane Smith', date: '2023-11-04', checkIn: '09:10', checkOut: '18:20', status: 'present', hours: 9.17 },
    { id: 9, staff: 'Robert Johnson', date: '2023-11-04', checkIn: '', checkOut: '', status: 'absent', hours: 0 },
    { id: 10, staff: 'Emily Davis', date: '2023-11-04', checkIn: '09:15', checkOut: '18:30', status: 'present', hours: 9.25 },
  ]);

  // Sample payroll data
  const [payroll, setPayroll] = useState([
    { id: 1, staff: 'John Doe', role: 'Manager', month: 'October 2023', workingDays: 26, salary: 35000, bonus: 5000, deductions: 2000, netPay: 38000 },
    { id: 2, staff: 'Jane Smith', role: 'Waiter', month: 'October 2023', workingDays: 25, salary: 18000, bonus: 2000, deductions: 1000, netPay: 19000 },
    { id: 3, staff: 'Robert Johnson', role: 'Waiter', month: 'October 2023', workingDays: 24, salary: 18000, bonus: 1500, deductions: 800, netPay: 18700 },
    { id: 4, staff: 'Emily Davis', role: 'Cashier', month: 'October 2023', workingDays: 26, salary: 22000, bonus: 2500, deductions: 1200, netPay: 23300 },
    { id: 5, staff: 'Michael Wilson', role: 'Chef', month: 'October 2023', workingDays: 26, salary: 28000, bonus: 3000, deductions: 1500, netPay: 29500 },
  ]);

  const handleAddStaff = () => {
    setSelectedStaff(null);
    setShowStaffModal(true);
  };

  const handleEditStaff = (staff) => {
    setSelectedStaff(staff);
    setShowStaffModal(true);
  };

  const handleAddRole = () => {
    setShowRoleModal(true);
  };

  const handleAddAttendance = () => {
    setShowAttendanceModal(true);
  };

  const handleSaveStaff = () => {
    // Save staff logic would go here
    setShowStaffModal(false);
    if (!selectedStaff) {
      alert('Staff member added successfully!');
    } else {
      alert('Staff member updated successfully!');
    }
  };

  const handleSaveRole = () => {
    // Save role logic would go here
    setShowRoleModal(false);
    alert('Role added successfully!');
  };

  const handleSaveAttendance = () => {
    // Save attendance logic would go here
    setShowAttendanceModal(false);
    alert('Attendance recorded successfully!');
  };

  const filteredStaff = searchTerm 
    ? staffMembers.filter(staff => 
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.phone.includes(searchTerm) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : staffMembers;

  // Chart options for staff performance
  const staffPerformanceOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['John', 'Jane', 'Robert', 'Emily', 'Michael'],
    },
    yaxis: {
      title: {
        text: 'Amount (₹)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹" + val
        }
      }
    },
    colors: ['#007bff', '#28a745']
  };

  const staffPerformanceSeries = [
    {
      name: 'Sales',
      data: [9600, 8400, 7500, 13500, 0]
    },
    {
      name: 'Tips',
      data: [960, 840, 750, 0, 0]
    }
  ];

  // Chart options for attendance
  const attendanceOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    },
    yaxis: {
      title: {
        text: 'Attendance %'
      },
      min: 0,
      max: 100
    },
    colors: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8']
  };

  const attendanceSeries = [
    {
      name: 'John',
      data: [100, 80, 100, 100]
    },
    {
      name: 'Jane',
      data: [100, 100, 80, 100]
    },
    {
      name: 'Robert',
      data: [80, 100, 100, 80]
    },
    {
      name: 'Emily',
      data: [100, 100, 100, 100]
    },
    {
      name: 'Michael',
      data: [100, 80, 100, 100]
    }
  ];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Staff Management</h5>
                <div>
                  <Button variant="outline-primary" className="me-2" onClick={handleAddRole}>
                    <FaPlus className="me-1" /> Add Role
                  </Button>
                  <Button variant="outline-success" className="me-2" onClick={handleAddAttendance}>
                    <FaPlus className="me-1" /> Record Attendance
                  </Button>
                  <Button variant="primary" onClick={handleAddStaff}>
                    <FaPlus className="me-1" /> Add Staff
                  </Button>
                </div>
              </div>

              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="staff">
                      <FaUserCog className="me-1" /> Staff
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="roles">
                      <FaUserCog className="me-1" /> Roles & Permissions
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="attendance">
                      <FaCalendarAlt className="me-1" /> Attendance
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="payroll">
                      <FaMoneyBillAlt className="me-1" /> Payroll
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="performance">
                      <FaChartLine className="me-1" /> Performance
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="staff">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                      <Form.Control 
                        placeholder="Search staff..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>

                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Role</th>
                          <th>Contact</th>
                          <th>Joining Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStaff.map(staff => (
                          <tr key={staff.id}>
                            <td>{staff.name}</td>
                            <td>{staff.role}</td>
                            <td>
                              {staff.phone}
                              <div><small className="text-muted">{staff.email}</small></div>
                            </td>
                            <td>{staff.joiningDate}</td>
                            <td>
                              <Badge bg={staff.status === 'active' ? 'success' : 'danger'}>
                                {staff.status === 'active' ? 'Active' : 'Inactive'}
                              </Badge>
                            </td>
                            <td>
                              <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleEditStaff(staff)}>
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
                  </Tab.Pane>

                  <Tab.Pane eventKey="roles">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Role Name</th>
                          <th>Permissions</th>
                          <th>Staff Count</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map(role => (
                          <tr key={role.id}>
                            <td>{role.name}</td>
                            <td>
                              {role.permissions.map((permission, idx) => (
                                <Badge key={idx} bg="secondary" className="me-1">{permission}</Badge>
                              ))}
                            </td>
                            <td>
                              {staffMembers.filter(staff => staff.role === role.name).length}
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
                  </Tab.Pane>

                  <Tab.Pane eventKey="attendance">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Form.Group style={{ width: '200px' }}>
                        <Form.Control type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                      </Form.Group>
                      <div>
                        <Button variant="outline-success" className="me-2">
                          <FaUserCheck className="me-1" /> Mark All Present
                        </Button>
                      </div>
                    </div>

                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Staff Name</th>
                          <th>Date</th>
                          <th>Check In</th>
                          <th>Check Out</th>
                          <th>Hours</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendance
                          .filter(record => record.date === '2023-11-05')
                          .map(record => (
                            <tr key={record.id}>
                              <td>{record.staff}</td>
                              <td>{record.date}</td>
                              <td>{record.checkIn || '-'}</td>
                              <td>{record.checkOut || '-'}</td>
                              <td>{record.hours}</td>
                              <td>
                                <Badge bg={record.status === 'present' ? 'success' : 'danger'}>
                                  {record.status === 'present' ? 'Present' : 'Absent'}
                                </Badge>
                              </td>
                              <td>
                                <Button variant="outline-primary" size="sm" className="me-1">
                                  <FaEdit />
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>

                  <Tab.Pane eventKey="payroll">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Form.Group style={{ width: '200px' }}>
                        <Form.Select defaultValue="October 2023">
                          <option>October 2023</option>
                          <option>September 2023</option>
                          <option>August 2023</option>
                        </Form.Select>
                      </Form.Group>
                      <Button variant="outline-primary">
                        <FaPlus className="me-1" /> Generate Payroll
                      </Button>
                    </div>

                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Staff Name</th>
                          <th>Role</th>
                          <th>Month</th>
                          <th>Working Days</th>
                          <th>Salary</th>
                          <th>Bonus</th>
                          <th>Deductions</th>
                          <th>Net Pay</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payroll.map(record => (
                          <tr key={record.id}>
                            <td>{record.staff}</td>
                            <td>{record.role}</td>
                            <td>{record.month}</td>
                            <td>{record.workingDays}</td>
                            <td>₹{record.salary.toLocaleString()}</td>
                            <td>₹{record.bonus.toLocaleString()}</td>
                            <td>₹{record.deductions.toLocaleString()}</td>
                            <td>₹{record.netPay.toLocaleString()}</td>
                            <td>
                              <Button variant="outline-primary" size="sm" className="me-1">
                                <FaEdit />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>

                  <Tab.Pane eventKey="performance">
                    <Row>
                      <Col lg={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">Staff Performance (Sales & Tips)</h6>
                          </Card.Header>
                          <Card.Body>
                            <ReactApexChart 
                              options={staffPerformanceOptions} 
                              series={staffPerformanceSeries} 
                              type="bar" 
                              height={350} 
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col lg={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">Attendance Percentage (Last Month)</h6>
                          </Card.Header>
                          <Card.Body>
                            <ReactApexChart 
                              options={attendanceOptions} 
                              series={attendanceSeries} 
                              type="line" 
                              height={350} 
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Staff Modal */}
      <Modal show={showStaffModal} onHide={() => setShowStaffModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStaff ? 'Edit Staff' : 'Add Staff'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter name" 
                defaultValue={selectedStaff?.name || ''}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select defaultValue={selectedStaff?.role || ''}>
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Enter phone number" 
                defaultValue={selectedStaff?.phone || ''}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                defaultValue={selectedStaff?.email || ''}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control 
                type="date" 
                defaultValue={selectedStaff?.joiningDate || new Date().toISOString().split('T')[0]}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select defaultValue={selectedStaff?.status || 'active'}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter address" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="number" placeholder="Enter monthly salary" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStaffModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveStaff}>
            {selectedStaff ? 'Update Staff' : 'Add Staff'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Role Modal */}
      <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control type="text" placeholder="Enter role name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Permissions</Form.Label>
              <div className="border rounded p-3">
                <Form.Check
                  type="checkbox"
                  id="perm-all"
                  label="All Permissions"
                  className="mb-2"
                />
                <hr />
                <Form.Check
                  type="checkbox"
                  id="perm-billing"
                  label="Billing"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="perm-tables"
                  label="Table Management"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="perm-menu"
                  label="Menu Management"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="perm-inventory"
                  label="Inventory Management"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="perm-reports"
                  label="Reports & Analytics"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="perm-customers"
                  label="Customer Management"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="perm-staff"
                  label="Staff Management"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="perm-settings"
                  label="Settings"
                  className="mb-2"
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRoleModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveRole}>
            Add Role
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Record Attendance Modal */}
      <Modal show={showAttendanceModal} onHide={() => setShowAttendanceModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Record Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Staff</Form.Label>
              <Form.Select>
                <option value="">Select Staff</option>
                {staffMembers.map(staff => (
                  <option key={staff.id} value={staff.id}>{staff.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Present"
                  name="attendanceStatus"
                  id="present"
                  defaultChecked
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Absent"
                  name="attendanceStatus"
                  id="absent"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Half Day"
                  name="attendanceStatus"
                  id="halfday"
                />
              </div>
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Check In</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Check Out</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Enter notes" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAttendanceModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAttendance}>
            Record Attendance
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Staff;
