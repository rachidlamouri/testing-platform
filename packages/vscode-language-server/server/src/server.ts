import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  TextDocumentSyncKind,
  InitializeResult,
} from 'vscode-languageserver/node';

import { TextDocument } from 'vscode-languageserver-textdocument';

const connection = createConnection(ProposedFeatures.all);

const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize(() => {
  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
    },
  };
  return result;
});

documents.onDidChangeContent((change) => {
  const { document } = change;

  const diagnostic: Diagnostic = {
    severity: DiagnosticSeverity.Warning,
    range: {
      start: document.positionAt(0),
      end: document.positionAt(4),
    },
    message: `IDK DUDE`,
    source: 'ex',
  };

  connection.sendDiagnostics({ uri: document.uri, diagnostics: [diagnostic] });
});

documents.listen(connection);

connection.listen();
