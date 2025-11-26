const Database = require("better-sqlite3");
const db = new Database("metadata.db");

// Initialize table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS documents (
    filename TEXT PRIMARY KEY,
    path TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT
  );
`);

function add_document(filename, path, title, description) {
    const stmt = db.prepare(`
    INSERT OR IGNORE INTO documents (filename, path, title, description)
    VALUES (?, ?, ?, ?)
    `);

    const info = stmt.run(filename, path, title, description);

    if (info.changes === 0) {
    return false;
    }

    return true;
}


function get_document(name) {
    const stmt = db.prepare(`SELECT * FROM documents WHERE filename = ?`);
    return stmt.get(name);
}

function get_documents() {
  const stmt = db.prepare(`SELECT * FROM documents`);
  return stmt.all();
}


module.exports = {
  add_document,
  get_document,
  get_documents,
};
