import discord

# --- Configuration ---
BOT_TOKEN = "MTQyNzYyMzg3MzAzMzAxNTM4OA.G_lbDo.sr88GL0bX-Qy0sDPCcGltTw45m7UnRtIspsLV0"
OUTPUT_FILE = "./all_servers_history.txt" # The requested change is on this line

# --- Bot Setup ---
intents = discord.Intents.default()
intents.messages = True
intents.message_content = True
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    """This function runs once the bot is connected and ready."""
    print(f'Bot is ready and logged in as {client.user}')
    print(f"The bot is a member of {len(client.guilds)} server(s).")

    # Open the output file in write mode with UTF-8 encoding
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        # Iterate over all guilds (servers) the bot is in
        for guild in client.guilds:
            print(f"\n--- Processing Server: {guild.name} (ID: {guild.id}) ---")
            f.write(f"\n\n======================================================\n")
            f.write(f"SERVER: {guild.name} (ID: {guild.id})\n")
            f.write(f"======================================================\n")

            # Iterate over all text channels in the server
            for channel in guild.text_channels:
                try:
                    print(f"  -> Fetching messages from #{channel.name}...")
                    f.write(f"\n\n--- History for Channel: #{channel.name} ---\n\n")
                    
                    # Fetch all messages from the channel's history
                    message_count = 0
                    async for message in channel.history(limit=None, oldest_first=True):
                        log_entry = f"[{message.created_at.strftime('%Y-%m-%d %H:%M:%S')}] {message.author}: {message.content}\n"
                        f.write(log_entry)
                        message_count += 1
                    print(f"     ... Found and wrote {message_count} messages.")

                except discord.Forbidden:
                    print(f"  [WARNING] No permission to read history in #{channel.name}. Skipping.")
                    f.write(f"--- Could not access history for #{channel.name} (Permissions Error) ---\n")
                except Exception as e:
                    print(f"  [ERROR] An error occurred in #{channel.name}: {e}")

    print(f"\n✅ All done! Message history for all servers has been saved to '{OUTPUT_FILE}'.")
    
    # Disconnect the bot once the task is complete
    await client.close()


# --- Run the Bot ---
try:
    client.run(BOT_TOKEN)
except discord.errors.LoginFailure:
    print("\n[ERROR] Login failed: Improper token has been passed.")