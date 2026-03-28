import { DictionaryApiResponse } from "@/types/DictionaryApiResponse";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.word) {
      const getFullWordData: DictionaryApiResponse = (
        await (
          await fetch(
            "https://api.dictionaryapi.dev/api/v2/entries/en/" + body.word,
          )
        ).json()
      )[0];

      return Response.json({
        wordTypes: getFullWordData.meanings.map((x) => x.partOfSpeech),
      });
    }
  } catch (err) {
    console.log(err);
  }
}
