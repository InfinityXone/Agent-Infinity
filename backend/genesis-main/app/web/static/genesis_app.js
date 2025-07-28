/**
 * Infinity X One - GENESIS™ Web Interface
 * Frontend JavaScript for OpenManusWeb integration
 */

class GenesisApp {
    constructor() {
        this.backendUrl = window.GENESIS_BACKEND_URL || 'https://w5hni7c7pegw.manussite.space';
        this.currentSessionId = null;
        this.websocket = null;
        this.isProcessing = false;
        this.thinkingSteps = [];
        this.files = [];
        this.logs = [];
        
        // DOM elements
        this.elements = {};
        
        // Initialize
        this.initializeElements();
        this.setupEventListeners();
        this.checkBackendStatus();
    }
    
    initializeElements() {
        this.elements = {
            // Status indicators
            backendStatus: document.getElementById('backend-status'),
            genesisStatus: document.getElementById('genesis-status'),
            
            // Chat elements
            chatMessages: document.getElementById('chat-messages'),
            userInput: document.getElementById('user-input'),
            sendBtn: document.getElementById('send-btn'),
            stopBtn: document.getElementById('stop-btn'),
            clearChatBtn: document.getElementById('clear-chat-btn'),
            
            // Thinking process
            thinkingSteps: document.getElementById('thinking-steps'),
            progressFill: document.getElementById('progress-fill'),
            progressText: document.getElementById('progress-text'),
            
            // Agent indicators
            agentIndicators: document.querySelectorAll('.agent-indicator'),
            
            // Files and logs
            filesList: document.getElementById('files-list'),
            logsContent: document.getElementById('logs-content'),
            refreshFilesBtn: document.getElementById('refresh-files-btn'),
            toggleLogsBtn: document.getElementById('toggle-logs-btn'),
            clearLogsBtn: document.getElementById('clear-logs-btn'),
            
            // Genesis controls
            startGenesisBtn: document.getElementById('start-genesis-btn'),
            
            // Modal
            fileViewerModal: document.getElementById('file-viewer-modal'),
            fileViewerTitle: document.getElementById('file-viewer-title'),
            fileContent: document.getElementById('file-content'),
            closeFileViewer: document.getElementById('close-file-viewer'),
            
            // Loading
            loadingOverlay: document.getElementById('loading-overlay')
        };
    }
    
    setupEventListeners() {
        // Chat functionality
        this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
        this.elements.stopBtn.addEventListener('click', () => this.stopSession());
        this.elements.clearChatBtn.addEventListener('click', () => this.clearChat());
        
        // Input handling
        this.elements.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Genesis controls
        this.elements.startGenesisBtn.addEventListener('click', () => this.startGenesisSystem());
        
        // Files and logs
        this.elements.refreshFilesBtn.addEventListener('click', () => this.refreshFiles());
        this.elements.toggleLogsBtn.addEventListener('click', () => this.toggleLogs());
        this.elements.clearLogsBtn.addEventListener('click', () => this.clearLogs());
        
        // Modal
        this.elements.closeFileViewer.addEventListener('click', () => this.closeFileViewer());
        this.elements.fileViewerModal.addEventListener('click', (e) => {
            if (e.target === this.elements.fileViewerModal) {
                this.closeFileViewer();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeFileViewer();
            }
        });
    }
    
    async checkBackendStatus() {
        try {
            const response = await fetch(`${this.backendUrl}/health`);
            const data = await response.json();
            
            if (data.status === 'healthy') {
                this.updateStatusIndicator('backend', 'connected', 'Genesis Backend');
                
                // Check Genesis system status
                await this.checkGenesisStatus();
            } else {
                this.updateStatusIndicator('backend', 'error', 'Backend Error');
            }
        } catch (error) {
            console.error('Backend status check failed:', error);
            this.updateStatusIndicator('backend', 'error', 'Connection Failed');
        }
    }
    
    async checkGenesisStatus() {
        try {
            const response = await fetch(`${this.backendUrl}/api/genesis/status`);
            const data = await response.json();
            
            if (data.genesis_active) {
                this.updateStatusIndicator('genesis', 'active', 'GENESIS™ Active');
            } else {
                this.updateStatusIndicator('genesis', 'standby', 'GENESIS™ Standby');
            }
        } catch (error) {
            console.error('Genesis status check failed:', error);
            this.updateStatusIndicator('genesis', 'error', 'GENESIS™ Error');
        }
    }
    
    updateStatusIndicator(type, status, text) {
        const indicator = this.elements[`${type}Status`];
        if (!indicator) return;
        
        const dot = indicator.querySelector('.status-dot');
        const textEl = indicator.querySelector('.status-text');
        
        // Remove existing status classes
        dot.className = 'status-dot';
        
        // Add new status class
        switch (status) {
            case 'connected':
            case 'active':
                dot.classList.add('status-connected');
                dot.style.background = 'var(--genesis-lime)';
                dot.style.boxShadow = '0 0 10px var(--genesis-lime)';
                break;
            case 'standby':
                dot.style.background = '#ffaa00';
                dot.style.boxShadow = '0 0 10px #ffaa00';
                break;
            case 'error':
                dot.style.background = '#ff4444';
                dot.style.boxShadow = '0 0 10px #ff4444';
                break;
            default:
                dot.style.background = 'var(--genesis-light-gray)';
                dot.style.boxShadow = 'none';
        }
        
        textEl.textContent = text;
    }
    
    async sendMessage() {
        const message = this.elements.userInput.value.trim();
        if (!message || this.isProcessing) return;
        
        this.isProcessing = true;
        this.updateUI('processing');
        
        // Add user message to chat
        this.addMessage('user', message);
        this.elements.userInput.value = '';
        
        try {
            // Create chat session
            const response = await fetch(`${this.backendUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    user_id: 'web_user'
                })
            });
            
            const data = await response.json();
            
            if (data.session_id) {
                this.currentSessionId = data.session_id;
                this.addMessage('ai', 'Genesis AI system activated. Coordinating autonomous agents...', 'Agent 0 - Master Coordinator');
                
                // Start monitoring session
                this.monitorSession(data.session_id);
                
                // Connect WebSocket for real-time updates
                this.connectWebSocket(data.session_id);
            } else {
                throw new Error('Failed to create session');
            }
        } catch (error) {
            console.error('Send message error:', error);
            this.addMessage('ai', 'Error: Failed to connect to Genesis system. Please try again.', 'System Error');
            this.isProcessing = false;
            this.updateUI('ready');
        }
    }
    
    async monitorSession(sessionId) {
        const maxAttempts = 60; // 5 minutes
        let attempts = 0;
        
        const checkSession = async () => {
            try {
                const response = await fetch(`${this.backendUrl}/api/chat/${sessionId}`);
                const data = await response.json();
                
                if (data.success && data.session) {
                    const session = data.session;
                    
                    // Update thinking process
                    if (session.thinking_steps) {
                        this.updateThinkingProcess(session.thinking_steps);
                    }
                    
                    // Update files
                    if (session.files) {
                        this.updateFiles(session.files);
                    }
                    
                    // Update logs
                    if (session.logs) {
                        this.updateLogs(session.logs);
                    }
                    
                    // Check if completed
                    if (session.status === 'completed' && session.ai_response) {
                        this.addMessage('ai', session.ai_response, 'Agent 0 - GENESIS™');
                        this.isProcessing = false;
                        this.updateUI('ready');
                        return;
                    }
                }
                
                attempts++;
                if (attempts < maxAttempts && this.isProcessing) {
                    setTimeout(checkSession, 5000); // Check every 5 seconds
                } else {
                    this.isProcessing = false;
                    this.updateUI('ready');
                }
            } catch (error) {
                console.error('Session monitoring error:', error);
                this.isProcessing = false;
                this.updateUI('ready');
            }
        };
        
        checkSession();
    }
    
    connectWebSocket(sessionId) {
        try {
            const wsUrl = this.backendUrl.replace('https://', 'wss://').replace('http://', 'ws://');
            this.websocket = new WebSocket(`${wsUrl}/ws/${sessionId}`);
            
            this.websocket.onopen = () => {
                console.log('WebSocket connected');
                this.websocket.send(JSON.stringify({
                    type: 'join_session',
                    session_id: sessionId
                }));
            };
            
            this.websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleWebSocketMessage(data);
            };
            
            this.websocket.onclose = () => {
                console.log('WebSocket disconnected');
            };
            
            this.websocket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        } catch (error) {
            console.error('WebSocket connection failed:', error);
        }
    }
    
    handleWebSocketMessage(data) {
        switch (data.type) {
            case 'thinking_update':
                if (data.thinking_steps) {
                    this.updateThinkingProcess(data.thinking_steps);
                }
                break;
            case 'session_complete':
                if (data.response) {
                    this.addMessage('ai', data.response, 'Agent 0 - GENESIS™');
                }
                this.isProcessing = false;
                this.updateUI('ready');
                break;
            case 'pong':
                // Keep-alive response
                break;
        }
    }
    
    updateThinkingProcess(steps) {
        this.thinkingSteps = steps;
        const container = this.elements.thinkingSteps;
        
        // Clear existing content
        container.innerHTML = '';
        
        steps.forEach((step, index) => {
            const stepEl = document.createElement('div');
            stepEl.className = 'thinking-step';
            stepEl.innerHTML = `
                <div class="step-icon">${this.getStepIcon(step.title)}</div>
                <div class="step-content">
                    <div class="step-title">${step.title}</div>
                    <div class="step-description">${step.description}</div>
                    <div class="step-timestamp">${new Date(step.timestamp).toLocaleTimeString()}</div>
                </div>
            `;
            container.appendChild(stepEl);
            
            // Animate step appearance
            setTimeout(() => {
                stepEl.style.opacity = '1';
                stepEl.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Update progress
        const progress = Math.min((steps.length / 6) * 100, 100);
        this.elements.progressFill.style.width = `${progress}%`;
        this.elements.progressText.textContent = `Processing... ${Math.round(progress)}%`;
        
        // Update agent indicators
        this.updateAgentIndicators(steps);
        
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }
    
    getStepIcon(title) {
        if (title.includes('Agent 0')) return '🤖';
        if (title.includes('FinSynapse')) return '💰';
        if (title.includes('ScraperDaemon')) return '🔍';
        if (title.includes('Codex Healer')) return '🛠️';
        if (title.includes('GENESIS')) return '🚀';
        return '🧠';
    }
    
    updateAgentIndicators(steps) {
        // Reset all indicators
        this.elements.agentIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Activate indicators based on recent steps
        const recentSteps = steps.slice(-4);
        recentSteps.forEach(step => {
            let agentType = '';
            if (step.title.includes('Agent 0')) agentType = 'agent-0';
            else if (step.title.includes('FinSynapse')) agentType = 'finsynapse';
            else if (step.title.includes('Codex Healer')) agentType = 'codex-healer';
            else if (step.title.includes('ScraperDaemon')) agentType = 'scraper-daemon';
            
            if (agentType) {
                const indicator = document.querySelector(`[data-agent="${agentType}"]`);
                if (indicator) {
                    indicator.classList.add('active');
                }
            }
        });
    }
    
    addMessage(type, content, sender = null) {
        const messagesContainer = this.elements.chatMessages;
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}-message`;
        
        const timestamp = new Date().toLocaleTimeString();
        const senderName = sender || (type === 'user' ? '👤 You' : '🤖 Genesis AI');
        
        messageEl.innerHTML = `
            <div class="message-header">
                <span class="sender">${senderName}</span>
                <span class="timestamp">${timestamp}</span>
            </div>
            <div class="message-content">${content}</div>
        `;
        
        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    updateFiles(files) {
        this.files = files;
        const container = this.elements.filesList;
        
        if (files.length === 0) {
            container.innerHTML = '<div class="files-placeholder"><p>No files generated yet.</p></div>';
            return;
        }
        
        container.innerHTML = '';
        files.forEach(file => {
            const fileEl = document.createElement('div');
            fileEl.className = 'file-item';
            fileEl.innerHTML = `
                <span class="file-name">${file.name}</span>
                <span class="file-size">${this.formatFileSize(file.size)}</span>
            `;
            
            fileEl.addEventListener('click', () => this.viewFile(file));
            container.appendChild(fileEl);
        });
    }
    
    updateLogs(logs) {
        this.logs = logs;
        const container = this.elements.logsContent;
        
        if (logs.length === 0) {
            container.innerHTML = '<div class="logs-placeholder"><p>No logs yet.</p></div>';
            return;
        }
        
        container.innerHTML = '';
        logs.forEach(log => {
            const logEl = document.createElement('div');
            logEl.className = 'log-entry';
            logEl.innerHTML = `
                <span class="log-timestamp">${new Date(log.timestamp).toLocaleTimeString()}</span>
                <span class="log-level ${log.level}">[${log.level.toUpperCase()}]</span>
                <span class="log-message">${log.message}</span>
            `;
            container.appendChild(logEl);
        });
        
        container.scrollTop = container.scrollHeight;
    }
    
    async viewFile(file) {
        try {
            const response = await fetch(`${this.backendUrl}/api/files/${file.path}`);
            const data = await response.json();
            
            if (data.success) {
                this.elements.fileViewerTitle.textContent = file.name;
                this.elements.fileContent.textContent = data.content;
                this.elements.fileViewerModal.style.display = 'block';
            } else {
                alert('Failed to load file content');
            }
        } catch (error) {
            console.error('File view error:', error);
            alert('Error loading file');
        }
    }
    
    closeFileViewer() {
        this.elements.fileViewerModal.style.display = 'none';
    }
    
    async stopSession() {
        if (!this.currentSessionId) return;
        
        try {
            await fetch(`${this.backendUrl}/api/chat/${this.currentSessionId}/stop`, {
                method: 'POST'
            });
            
            this.isProcessing = false;
            this.updateUI('ready');
            this.addMessage('ai', 'Session stopped by user.', 'System');
            
            if (this.websocket) {
                this.websocket.close();
            }
        } catch (error) {
            console.error('Stop session error:', error);
        }
    }
    
    clearChat() {
        this.elements.chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="message ai-message">
                    <div class="message-header">
                        <span class="sender">🤖 Agent 0 - Master Coordinator</span>
                        <span class="timestamp">${new Date().toLocaleTimeString()}</span>
                    </div>
                    <div class="message-content">
                        Welcome to Infinity X One - GENESIS™! I am Agent 0, your autonomous AI coordinator. 
                        How may I assist you with autonomous AI coordination today?
                    </div>
                </div>
            </div>
        `;
        
        // Clear thinking process
        this.elements.thinkingSteps.innerHTML = '<div class="thinking-placeholder"><p>🤖 Genesis AI agents ready for coordination...</p></div>';
        this.elements.progressFill.style.width = '0%';
        this.elements.progressText.textContent = 'Ready';
        
        // Reset agent indicators
        this.elements.agentIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
    }
    
    async startGenesisSystem() {
        try {
            this.elements.loadingOverlay.style.display = 'flex';
            
            const response = await fetch(`${this.backendUrl}/api/genesis/start`, {
                method: 'POST'
            });
            const data = await response.json();
            
            if (data.success) {
                this.updateStatusIndicator('genesis', 'active', 'GENESIS™ Active');
                this.addMessage('ai', data.message, 'GENESIS™ System');
            } else {
                this.addMessage('ai', `Failed to start GENESIS™: ${data.error}`, 'System Error');
            }
        } catch (error) {
            console.error('Start Genesis error:', error);
            this.addMessage('ai', 'Error starting GENESIS™ system.', 'System Error');
        } finally {
            this.elements.loadingOverlay.style.display = 'none';
        }
    }
    
    async refreshFiles() {
        try {
            const response = await fetch(`${this.backendUrl}/api/files`);
            const data = await response.json();
            
            if (data.success) {
                this.updateFiles(data.files);
            }
        } catch (error) {
            console.error('Refresh files error:', error);
        }
    }
    
    toggleLogs() {
        const logsContent = this.elements.logsContent;
        const toggleBtn = this.elements.toggleLogsBtn;
        
        if (logsContent.classList.contains('collapsed')) {
            logsContent.classList.remove('collapsed');
            toggleBtn.textContent = 'Collapse';
        } else {
            logsContent.classList.add('collapsed');
            toggleBtn.textContent = 'Expand';
        }
    }
    
    clearLogs() {
        this.elements.logsContent.innerHTML = '<div class="logs-placeholder"><p>Logs cleared.</p></div>';
    }
    
    updateUI(state) {
        switch (state) {
            case 'processing':
                this.elements.sendBtn.style.display = 'none';
                this.elements.stopBtn.style.display = 'flex';
                this.elements.userInput.disabled = true;
                break;
            case 'ready':
                this.elements.sendBtn.style.display = 'flex';
                this.elements.stopBtn.style.display = 'none';
                this.elements.userInput.disabled = false;
                this.elements.progressFill.style.width = '100%';
                this.elements.progressText.textContent = 'Complete';
                break;
        }
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    static init() {
        window.genesisApp = new GenesisApp();
        return window.genesisApp;
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', GenesisApp.init);
} else {
    GenesisApp.init();
}

// Export for global access
window.GenesisApp = GenesisApp;

