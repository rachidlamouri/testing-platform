import * as vscode from 'vscode';

export const activate = (context: vscode.ExtensionContext): void => {
  const disposable = vscode.commands.registerCommand(
    'vscode-extension.sayHello',
    () => {
      vscode.window.showInformationMessage('Hello World!').then(
        () => {},
        (error: Error) => {
          // eslint-disable-next-line no-console
          console.error(error.message);
          // eslint-disable-next-line no-console
          console.error(error.stack);
        },
      );
    },
  );

  context.subscriptions.push(disposable);
};

// TODO: figure out what to do so we don't have to make an extraneous export
export type Src = symbol;
