import {
  createCard,
  getCard,
  updateCard,
  getAllCards,
  deleteCard,
} from "../actions/cardActions";

async function testActions() {
  // Use a valid userId from your database.
  const testUserId = "cm6molniz00031e0v8kmnw3ml";

  // 1. Create a new card
  const newCard = await createCard({
    userId: testUserId,
    body: "This is a test card body.",
    title: "Test Card Title",
    tags: ["test", "demo"],
  });
  console.log("Created Card:", newCard);

  // 2. Fetch the card by its ID
  const fetchedCard = await getCard(newCard.id);
  console.log("Fetched Card:", fetchedCard);

  // 3. Update the card
  const updatedCard = await updateCard(newCard.id, {
    body: "Updated test card body.",
    title: "Updated Test Card Title",
  });
  console.log("Updated Card:", updatedCard);

  // 4. Get all cards for the user
  const cards = await getAllCards(testUserId);
  console.log("All Cards for User:", cards);

  // 5. Delete the card
  const deletedCard = await deleteCard(newCard.id);
  console.log("Deleted Card:", deletedCard);
}

testActions()
  .then(() => {
    console.log("Test actions completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error testing card actions:", error);
    process.exit(1);
  });
