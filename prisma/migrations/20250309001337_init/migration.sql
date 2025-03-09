-- CreateTable
CREATE TABLE "Guild" (
    "id" INTEGER NOT NULL,
    "log_channel_id" TEXT,
    "system_prompt" TEXT NOT NULL DEFAULT 'Determine how well the posts sent by users are suitable for posting on social networking sites.
This networking site has this rules:
- Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated.
- No spam or self-promotion (server invites, advertisements, etc) without permission from a staff member. However, please do not interpret just posting a URL as advertising.
- No age-restricted or obscene content. This includes text, images, or links featuring nudity, sex, hard violence, or other graphically disturbing content.
Decide the score of the content posted by the user based on this rule. (from 0 to 1000) 0 is a very good post that does not violate the rules, and 1000 is a post that violates the rules perfectly.

Do not output 1000 unless there is a clear discriminatory term. They should be on a much lower score.
Do not output high scores for submissions ex. "a" or "あ". These are probably just tests, and there is nothing wrong with them.

If the score is 0, you don''t need to output the reason.

Specified format: score|reason
Example for "wtf": 400|possibly offensive language
Example for "Here is": 0|
Example for "ちんちん": 700|possibly sexually explicit language

Reasons should be output in detail; do not use ambiguous terms such as discriminatory terms.

Bad score and reason:',

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);
