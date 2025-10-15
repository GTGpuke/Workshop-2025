import discord
import os

# --- Configuration ---
BOT_TOKEN = "MTQyNzYyMzg3MzAzMzAxNTM4OA.G_lbDo.sr88GL0bX-Qy0sDPCcGltTw45m7UnRtIspsLV0"

# --- Bot Setup ---
intents = discord.Intents.default()
intents.messages = True
intents.message_content = True
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    """This function is called when the bot successfully connects to Discord."""
    print(f'Bot is ready and logged in as {client.user}')
    print('Watching for new messages...')
    print('-----------------------------------------')

@client.event
async def on_message(message):
    """This function is called for every new message the bot can see."""
    # Ignore messages sent by the bot itself to prevent loops
    if message.author == client.user:
        return

    # Print new message details to the console
    channel_name = message.channel
    author_name = message.author
    message_content = message.content
    timestamp = message.created_at.strftime('%Y-%m-%d %H:%M:%S')

    print(f"[{timestamp}] #{channel_name} | {author_name}: {message_content}")


# --- Run the Bot ---
try:
    client.run(BOT_TOKEN)
except discord.errors.LoginFailure:
    print("\n[ERROR] Login failed: Improper token has been passed.")