# This script asks the user for their name and prints an interstellar-themed personalized welcome message.

# Define the special name to check for
# I'm calling it 'special_director_name' to make it clear what it's for.
special_director_name = "Christian"

# Ask the user for their name and store it in the 'name' variable
name = input("Greetings, cosmic traveler! What is your name? ")

# ---

# Now, we check if the name entered is our special director's name.
if name == special_director_name:
    # If it is, print the super special welcome message.
    print(f"Hey, it's the awesome AI Director, {name}! Your stellar command center awaits!")
else:
    # If it's any other name, print the regular interstellar greeting.
    message = f"Welcome aboard, Navigator {name}! Your journey through the stars begins now. May your path be filled with wonder and discovery across the cosmos!"
    print(message) 