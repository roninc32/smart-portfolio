-- PostgreSQL Schema for AI Twin Portfolio Chat Logs
-- Run: psql -U postgres -d smart_portfolio -f database/schema.sql

CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    message_content TEXT NOT NULL,
    sender_type VARCHAR(10) NOT NULL CHECK (sender_type IN ('user', 'ai')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_chats_session_id ON chats(session_id);
CREATE INDEX IF NOT EXISTS idx_chats_created_at ON chats(created_at);
