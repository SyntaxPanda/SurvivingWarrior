import {Patch} from "../model/PatchType";

export default function usePatch() {

    const patchNotes: Patch[] = [{
        version: "0.1", description: "· After death u will go to the DeathScreen directly without more playing\n" +
            "-· User got now notification if the had something false at login\n" +
            "-· User need now a longer Username for registration, longer than 3 letters\n" +
            "-· Create a new game need now a CharacterName and GameName its longer than 3 letters\n", date: "04.07.2023"
    },
        {
            version: "0.2", description: "· Now Player can see a button for PatchNotes\n" +
                "-· PatchNote site with new Patches (finish) ot the FirstPage and StartPage\n" +
                "-· Fix text notification at DeathPage from \"Death\" to \"dead\"", date: "04.07.2023"
        },
        {
            version: "0.3", description: "· Character has now a fixed value.\n" +
                "-· Character has now new values(Pots and HealPower), Pots are limited and HealPower is how much life one Pots heals.\n" +
                "-· The 3rd button \"Item\" is now a \"Pot\" button with visual value of ur Pots.\n" +
                "-· Character can now choose his own way with 10 start SkillPoints.", date: "04.07.2023"
        },
        {
            version: "0.4.1", description:
                "· Hard reset to enjoy all new functions." +
                "-· Hotfix for HealPot." +
                "-· Now u can kill the Dragon and got the next Story." +
                "-· For every Achievement u got now 5 AchievementPoints for leaderboard(is coming)." +
                "-· For every Achievement u reached, u start new Character with 1 skill point more."
                , date: "05.07.2023"
        },
        {
            version: "0.4.2", description:
                "· Character get now 3 skill points for lvl up, before 5." +
                "-· Character needs now 15 exp to get lvl up, before 10."
            , date: "05.07.2023"
        },
        {
            version: "0.4.3", description:
                "· Story Update: The way to Hell" +
                "-· New options for buttons." +
                "-· Fix Vendor Heal, now they cant heal more than maxLife"
            , date: "05.07.2023"
        },
        {
            version: "0.4.4", description:
                "· Leaderboard for DragonCounter, AchievementPoints, LevelCounter and GoldCounter"
            , date: "06.07.2023"
        },
        {
            version: "0.4.5", description:
                "· Balancing for story chapter 2" +
                "-· Dragons now stronger" +
                "-· Better design for mobile user" +
                "-· Change exp needed for lvl from 15 to 12" +
                "-· Change how much life u got for 1 skill point from 1 to 3" +
                "-· Change character life from 50 to 55" +
                "-· Change character damage from 4 to 5" +
                "-· Change character heal power from 5 to 7"
            , date: "08.07.2023"
        },
        {
            version: "0.4.6", description:
                "· After kill a Dragon, character get lvl up" +
                "-· In story chapter 2 u get now 4 exp from enemy, before 3" +
                "-· If character get level, he get 3 maxLife, before 0 and 1 damage, before 0" +
                "-· Character get now 2 maxLife, before 3 when come level up" +
                "-· Block is now double hit(character damage * 1.5)"
            , date: "08.07.2023"
        },
        {
            version: "0.4.7", description:
                "· Add a LogChatWindow for a better view how much damage character and enemy get" +
                "-· Change exp rate of enemy chapter 1 from 3 to 2 and chapter 2 from 4 to 3" +
                "-· Change life per skill point from 3 to 2" +
                "-· Change how much skill points for lvl characters got from 3 to 2"
            , date: "08.07.2023"
        }]

    //character klasse, z.b. krieger und magier damit sie statt block dann feuerball und doppelhit

    //story weiter ausbauen

    //Krieger hat dann doppelhit, muss aber danach 3 runden abklingen haben auf der fähigkeit
    //paar neue achievements (für heal power, trank Anzahl, gesamt geheilter betrag, höllen wesen getötet)
    //Bug Page um bugs zu melden und abhacken lassen damit andere sehen könne ob der Bug bearbeitet wurde
    //infos zu jeder page bzw jeden button
    //animation für hit am mob und char

    //!!!!!!ChangeLog für die kampf werte wie im chat bei wow!!!!!!! dafür keine toast mehr für die anzeige

    //multiplayer???

    return {patchNotes}
}
