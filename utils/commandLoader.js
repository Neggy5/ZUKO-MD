/**
 * Command Loader - Loads all commands from commands folder
 * ES Module version
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadCommands = async () => {
    const commands = new Map(); // This MUST be a Map
    const commandsPath = path.join(__dirname, '..', 'commands');
    
    if (!fs.existsSync(commandsPath)) {
        console.error('❌ Commands folder not found:', commandsPath);
        return commands; // Return empty Map
    }
    
    const commandFiles = fs.readdirSync(commandsPath).filter(file => 
        file.endsWith('.js') && !file.startsWith('_') && file !== 'reactions.js'
    );
    
    console.log(`📂 Loading ${commandFiles.length} commands...`);
    
    for (const file of commandFiles) {
        try {
            const commandPath = path.join(commandsPath, file);
            const commandModule = await import(`file://${commandPath}`);
            const command = commandModule.default || commandModule;
            
            // Skip if no execute function
            if (!command || typeof command.execute !== 'function') {
                console.log(`  ⚠️ Skipping ${file}: No execute function`);
                continue;
            }
            
            const commandName = command.name || path.basename(file, '.js');
            
            // Store command in Map
            commands.set(commandName.toLowerCase(), command);
            
            // Store aliases
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach(alias => {
                    commands.set(alias.toLowerCase(), command);
                });
            }
            
            console.log(`  ✅ Loaded: ${commandName}${command.aliases ? ` (${command.aliases.join(', ')})` : ''}`);
        } catch (error) {
            console.error(`  ❌ Failed to load ${file}:`, error.message);
        }
    }
    
    console.log(`✅ Total commands loaded: ${commands.size}`);
    return commands; // Return the Map
};

export { loadCommands };