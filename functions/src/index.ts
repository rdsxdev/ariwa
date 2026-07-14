import { onRequest } from "firebase-functions/https";
import { onSchedule } from "firebase-functions/scheduler";
import * as firebase from "firebase-functions/v2";
import { logger } from "firebase-functions/v2";

// https://random-word-api.herokuapp.com/home

export const generateword = onSchedule("every day 07:30", async (event) => {
  const word = await (
    await fetch(
      "https://random-word-api.herokuapp.com/word?length=" +
        Math.floor(Math.random()) * 3 +
        7,
    )
  ).json();

  console.log("UNGABUNGA");
  console.log("UNGABUNGA");
  console.log("UNGABUNGA");
  console.log("UNGABUNGA");
  logger.write(word);
  logger.write(word);
  console.log(word);
  console.log(word);
});
