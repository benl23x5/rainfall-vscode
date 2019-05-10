
import * as vscode   from 'vscode';
import * as vsclient from 'vscode-languageclient';

export function activate(context: vscode.ExtensionContext) {

        // Get the server path from the config.
        let cfgServerPath: string | undefined
                = vscode.workspace.getConfiguration('rainfall').get('server.executable');

        let serverPath: string
                = ("" + cfgServerPath) === ""
                        ? 'rainfall'
                        : "" + cfgServerPath;

        // Get the debug log from the config, if it's set.
        let cfgDebugLog: string | undefined
                = vscode.workspace.getConfiguration('rainfall').get('trace.debug');

        let args: string[]
                =  ("" + cfgDebugLog) === ""
                        ? ['-lsp']
                        : ['-lsp-debug', "" + cfgDebugLog];

        // Start the language server.
	let serverOptions: vsclient.ServerOptions = {
		run:   { command: serverPath, args: args },
		debug: { command: serverPath, args: args }
	};

	let clientOptions: vsclient.LanguageClientOptions = {
		documentSelector: ['rainfall'],
		synchronize: {
			configurationSection: 'rainfall',
			fileEvents: vscode.workspace.createFileSystemWatcher('**/.rainfallrc')
		}
	};

//	let dClient = new vsclient.LanguageClient(
//		'salt',
//		'Salt Language Server',
//		serverOptions,
//		clientOptions).start();
//	context.subscriptions.push(dClient);
}

export function deactivate() {}
