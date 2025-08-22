/**
 * HTTP API 测试脚本
 * 用于验证 API 服务器的各个接口功能
 */

const http = require('http');

// 测试配置
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * 发送 HTTP 请求的辅助函数
 */
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: jsonBody,
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * 测试健康检查接口
 */
async function testHealthCheck() {
  console.log('\n=== 测试健康检查接口 ===');
  try {
    const response = await makeRequest('GET', '/health');
    console.log('状态码:', response.statusCode);
    console.log('响应:', JSON.stringify(response.body, null, 2));
    return response.statusCode === 200;
  } catch (error) {
    console.error('健康检查失败:', error.message);
    return false;
  }
}

/**
 * 测试服务器状态接口
 */
async function testServerStatus() {
  console.log('\n=== 测试服务器状态接口 ===');
  try {
    const response = await makeRequest('GET', '/status');
    console.log('状态码:', response.statusCode);
    console.log('响应:', JSON.stringify(response.body, null, 2));
    return response.statusCode === 200;
  } catch (error) {
    console.error('获取服务器状态失败:', error.message);
    return false;
  }
}

/**
 * 测试客户端列表接口
 */
async function testClientList() {
  console.log('\n=== 测试客户端列表接口 ===');
  try {
    const response = await makeRequest('GET', '/clients');
    console.log('状态码:', response.statusCode);
    console.log('响应:', JSON.stringify(response.body, null, 2));
    return response.statusCode === 200;
  } catch (error) {
    console.error('获取客户端列表失败:', error.message);
    return false;
  }
}

/**
 * 测试发送消息接口
 */
async function testSendMessage() {
  console.log('\n=== 测试发送消息接口 ===');
  try {
    const messageData = {
      type: 'UPLOAD_FILE',
      nodeId: 'test-node-123',
      payload: {
        description: '测试文件上传',
        assetsId: 'test-asset-123',
        status: 'success',
      },
    };

    const response = await makeRequest('POST', '/send-message', messageData);
    console.log('状态码:', response.statusCode);
    console.log('响应:', JSON.stringify(response.body, null, 2));
    return response.statusCode === 200;
  } catch (error) {
    console.error('发送消息失败:', error.message);
    return false;
  }
}

/**
 * 测试广播消息接口
 */
async function testBroadcastMessage() {
  console.log('\n=== 测试广播消息接口 ===');
  try {
    const messageData = {
      nodeId: 'broadcast-test-node',
      payload: {
        status: 'running',
        assetsId: ['test-asset-1', 'test-asset-2'],
        toolId: 'test-tool-123',
        url: 'http://localhost:8080/test-tool',
      },
    };

    const response = await makeRequest('POST', '/broadcast/RUN_TOOL', messageData);
    console.log('状态码:', response.statusCode);
    console.log('响应:', JSON.stringify(response.body, null, 2));
    return response.statusCode === 200;
  } catch (error) {
    console.error('广播消息失败:', error.message);
    return false;
  }
}

/**
 * 运行所有测试
 */
async function runAllTests() {
  console.log('开始测试 HTTP API 接口...');
  console.log('请确保服务器正在运行 (pnpm run start)');

  const tests = [
    { name: '健康检查', fn: testHealthCheck },
    { name: '服务器状态', fn: testServerStatus },
    { name: '客户端列表', fn: testClientList },
    { name: '发送消息', fn: testSendMessage },
    { name: '广播消息', fn: testBroadcastMessage },
  ];

  const results = [];
  for (const test of tests) {
    try {
      const result = await test.fn();
      results.push({ name: test.name, success: result });
    } catch (error) {
      console.error(`测试 ${test.name} 出现异常:`, error.message);
      results.push({ name: test.name, success: false });
    }
  }

  console.log('\n=== 测试结果汇总 ===');
  results.forEach((result) => {
    const status = result.success ? '✅ 通过' : '❌ 失败';
    console.log(`${result.name}: ${status}`);
  });

  const passedTests = results.filter(r => r.success).length;
  console.log(`\n总计: ${passedTests}/${results.length} 个测试通过`);

  if (passedTests === results.length) {
    console.log('🎉 所有测试都通过了！HTTP API 服务器工作正常。');
  } else {
    console.log('⚠️  部分测试失败，请检查服务器状态。');
  }
}

// 运行测试
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  makeRequest,
  testHealthCheck,
  testServerStatus,
  testClientList,
  testSendMessage,
  testBroadcastMessage,
  runAllTests,
};
