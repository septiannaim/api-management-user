const http = require('http');

const baseUrl = 'http://localhost:3000';

// Test functions
async function testEndpoint(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Run tests
async function runTests() {
  console.log('🧪 Testing User Management API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const health = await testEndpoint('GET', '/health');
    console.log(`   Status: ${health.status}`);
    console.log(`   Response: ${JSON.stringify(health.data, null, 2)}\n`);

    // Test 2: API Info
    console.log('2. Testing API Info...');
    const info = await testEndpoint('GET', '/');
    console.log(`   Status: ${info.status}`);
    console.log(`   Response: ${JSON.stringify(info.data, null, 2)}\n`);

    // Test 3: Get All Users
    console.log('3. Testing Get All Users...');
    const users = await testEndpoint('GET', '/api/users');
    console.log(`   Status: ${users.status}`);
    console.log(`   Response: ${JSON.stringify(users.data, null, 2)}\n`);

    // Test 4: Create User
    console.log('4. Testing Create User...');
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '081234567890',
      department: 'IT',
      isActive: true
    };
    const createUser = await testEndpoint('POST', '/api/users', newUser);
    console.log(`   Status: ${createUser.status}`);
    console.log(`   Response: ${JSON.stringify(createUser.data, null, 2)}\n`);

    // Test 5: Get User by ID (if user was created)
    if (createUser.status === 201 && createUser.data.data && createUser.data.data._id) {
      console.log('5. Testing Get User by ID...');
      const userId = createUser.data.data._id;
      const getUser = await testEndpoint('GET', `/api/users/${userId}`);
      console.log(`   Status: ${getUser.status}`);
      console.log(`   Response: ${JSON.stringify(getUser.data, null, 2)}\n`);

      // Test 6: Update User
      console.log('6. Testing Update User...');
      const updateData = {
        name: 'Updated Test User',
        department: 'HR',
        isActive: false
      };
      const updateUser = await testEndpoint('PUT', `/api/users/${userId}`, updateData);
      console.log(`   Status: ${updateUser.status}`);
      console.log(`   Response: ${JSON.stringify(updateUser.data, null, 2)}\n`);

      // Test 7: Delete User
      console.log('7. Testing Delete User...');
      const deleteUser = await testEndpoint('DELETE', `/api/users/${userId}`);
      console.log(`   Status: ${deleteUser.status}`);
      console.log(`   Response: ${JSON.stringify(deleteUser.data, null, 2)}\n`);
    }

    // Test 8: Test validation error
    console.log('8. Testing Validation Error...');
    const invalidUser = {
      name: 'A', // Too short
      email: 'invalid-email', // Invalid email
      phone: '123', // Too short
      department: 'A' // Too short
    };
    const validationError = await testEndpoint('POST', '/api/users', invalidUser);
    console.log(`   Status: ${validationError.status}`);
    console.log(`   Response: ${JSON.stringify(validationError.data, null, 2)}\n`);

    console.log('✅ All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the tests
runTests(); 