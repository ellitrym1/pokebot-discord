const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");
const _ = require("lodash");

const discord = require("discord.js");
const { get } = require("lodash");

const client = new discord.Client();

const prefix = ">";

client.on("ready", () => {
    console.log(`READY!`);
});

client.on("message", (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();

    const msgEmbed = new discord.MessageEmbed();

    if (cmd === "poke") {
        if (args[0] === "pic" || args[0] === "info") {
            let pokeIndex = args[1];
            if (pokeIndex) {
                if (args[0] == "pic") {
                    console.log("pic");
                    if (pokeIndex === "random") {
                        pokeIndex = getRandom(1, 898);
                        pokePic(pokeIndex);
                    } else {
                        pokePic(pokeIndex);
                    }
                } else {
                    if (pokeIndex === "random") {
                        pokeIndex = getRandom(1, 898);
                        pokeInfo(pokeIndex);
                    } else {
                        pokeInfo(pokeIndex);
                    }
                }
            } else {
            }
        } else if (args[0] === "help") {
        } else {
        }
    }
    function pokePic(pokeIndex) {
        getPokemon(pokeIndex)
            .then((res) => {
                console.log(res.id);
                msgEmbed
                    .setTitle(_.capitalize(res.name))
                    .setColor("#FF0000")
                    .setImage(
                        `https://cdn.traction.one/pokedex/pokemon/${res.id}.png`
                    );
                msg.channel.send(msgEmbed);
            })
            .catch((err) => {
                return null;
            });
    }

    function pokeInfo(pokeIndex) {
        getPokemon(pokeIndex)
            .then((res) => {
                console.log(res.id);
                msgEmbed
                    .setTitle(_.capitalize(res.name))
                    .setColor("#FF0000")
                    .setThumbnail(
                        `https://cdn.traction.one/pokedex/pokemon/${res.id}.png`
                    )
                    .addFields(
                        {
                            name: "Name",
                            value: `${_.capitalize(res.name)}`,
                        },
                        {
                            name: "Type",
                            value: `${res.types.map((e) => {
                                return e.type.name + " ";
                            })}`,
                            inline: true,
                        },
                        {
                            name: "Height",
                            value: `${res.height}`,
                            inline: true,
                        },
                        {
                            name: "Weight",
                            value: `${res.weight}`,
                            inline: true,
                        },
                        res.stats.map((e) => {
                            return {
                                name: `${_.capitalize(e.stat.name)}`,
                                value: `${e.base_stat}`,
                                inline: true,
                            };
                        })
                    );
                msg.channel.send(msgEmbed);
            })
            .catch((err) => {
                return null;
            });
    }
});

function getPokemon(index) {
    pokeDataJson = fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
        .then((data) => {
            return data.json();
        })
        .then((json) => {
            return json;
        })
        .catch((err) => {
            console.log(err);
        });

    return pokeDataJson;
}

function getRandom(min, max) {
    num = Math.random() * (max - min) + min;
    return Math.round(num);
}

client.login(process.env.TOKEN);
