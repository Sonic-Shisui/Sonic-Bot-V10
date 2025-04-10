const axios = require("axios")

const serverURL = "https://api-uchiha-perdu.onrender.com"
const ADMIN_UID = ["61563822463333", "100090405019929"]

function formatNumber(number) {
  const suffixes = [
    "", " thousand", " million", " billion", " billiard", " trillion", " trilliard",
    " quadrillion", " quadrilliard", " quintillion", " quintilliard", " sextillion", " sextilliard",
    " septillion", " septilliard", " octillion", " octilliard", " nonillion", " nonilliard",
    " decillion", " decilliard", " undecillion", " undecilliard", " duodecillion", " duodecilliard",
    " tredecillion", " tredecilliard", " quattuordecillion", " quattuordecilliard", " quindecillion",
    " quindecilliard", " sexdecillion", " sexdecilliard", " septendecillion", " septendecilliard",
    " octodecillion", " octodecilliard", " novemdecillion", " novemdecilliard", " vigintillion",
    " vigintilliard", " unvigintillion", " unvigintilliard", " duovigintillion", " duovigintilliard",
    " trevigintillion", " trevigintilliard", " quattuorvigintillion", " quattuorvigintilliard",
    " quinvigintillion", " quinvigintilliard", " sexvigintillion", " sexvigintilliard",
    " septenvigintillion", " septenvigintilliard", " octovigintillion", " octovigintilliard",
    " novemvigintillion", " novemvigintilliard", " trigintillion", " trigintilliard",
    " untrigintillion", " untrigintilliard", " duotrigintillion", " duotrigintilliard",
    " tretrigintillion", " tretrigintilliard", " quattuortrigintillion", " quattuortrigintilliard",
    " quintrigintillion", " quintrigintilliard", " sextrigintillion", " sextrigintilliard",
    " septentrigintillion", " septentrigintilliard", " octotrigintillion", " octotrigintilliard",
    " novemtrigintillion", " novemtrigintilliard", " quadragintillion", " quadragintilliard",
    " unquadragintillion", " unquadragintilliard", " duoquadragintillion", " duoquadragintilliard",
    " trequadragintillion", " trequadragintilliard", " quattuorquadragintillion", " quattuorquadragintilliard",
    " quinquadragintillion", " quinquadragintilliard", " sexquadragintillion", " sexquadragintilliard",
    " septenquadragintillion", " septenquadragintilliard", " octoquadragintillion", " octoquadragintilliard",
    " novemquadragintillion", " novemquadragintilliard", " quinquagintillion", " quinquagintilliard"
  ]
  if (!Number.isFinite(number) || number === null || number === undefined) return "Price not defined"
  if (number < 1000) return number.toString()
  let exponent = Math.floor(Math.log10(number) / 3)
  let shortNumber = number / Math.pow(1000, exponent)
  return `${shortNumber.toFixed(2)}${suffixes[exponent]}`
}

module.exports = {
  config: {
    name: "store",
    aliases: ["commandstore"],
    version: "4.2",
    role: 0,
    shortDescription: {
      en: "Access the premium command store"
    },
    longDescription: {
      en: "Allows you to search and buy premium commands available in the CommandStore.\n- Use 'store page <number>' to view commands by page.\n- Use 'store search <name>' to search for a specific command.\n- Use 'store search category <category>' to view commands in a category."
    },
    guide: {
      en: "{p}page <number>\n{p}search <command name>\n{p}search category <category>"
    },
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡 || L'Uchiha Perdu",
    category: "economy"
  },

  onStart: async ({ api, event, args, message, usersData }) => {
    try {
      if (args[0]?.toLowerCase() === "page") {
        const page = parseInt(args[1]) || 1
        const perPage = 15
        const response = await axios.get(`${serverURL}/api/commands`)
        const commands = response.data
        if (!commands.length) {
          return api.sendMessage(
            "🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n⚠️ No commands available at the moment.\nCome back later! 🕒\n━━━━━━━━━━━━━━━",
            event.threadID,
            event.messageID
          )
        }
        const totalPages = Math.ceil(commands.length / perPage)
        if (page < 1 || page > totalPages) {
          return api.sendMessage(
            `🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n⚠️ Please specify a valid page number.\nAvailable pages: 1 to ${totalPages}\n➤ Usage: store page <number>\n━━━━━━━━━━━━━━━`,
            event.threadID,
            event.messageID
          )
        }
        const start = (page - 1) * perPage
        const end = start + perPage
        const paginatedCommands = commands.slice(start, end)
        const commandList = paginatedCommands.map((cmd, index) => 
          `${start + index + 1}- ${cmd.itemName}`
        ).join("\n")
        return api.sendMessage(
          `🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n📜 List of commands (Page ${page}/${totalPages}):\n${commandList}\n━━━━━━━━━━━━━━━\nReply with the number of the command to buy (e.g., "1" for the first command).`,
          event.threadID,
          (err, info) => {
            if (err) return api.sendMessage(
              "❌ An error occurred while sending the message.",
              event.threadID, event.messageID
            )
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "store",
              type: "select",
              messageID: info.messageID,
              commands: paginatedCommands,
              userID: event.senderID,
              threadID: event.threadID,
              expiresAt: Date.now() + 300000
            })
          },
          event.messageID
        )
      }

      if (args[0]?.toLowerCase() === "search") {
        if (args[1]?.toLowerCase() === "category") {
          if (!args[2]) {
            return api.sendMessage(
              "🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n⚠️ Please specify a category!\n➤ Usage: store search category <category>\n━━━━━━━━━━━━━━━",
              event.threadID,
              event.messageID
            )
          }
          const category = args.slice(2).join(" ")
          const response = await axios.get(`${serverURL}/api/commands`)
          const commands = response.data
          const filteredCommands = commands.filter(cmd => cmd.category?.toLowerCase() === category.toLowerCase())
          if (!filteredCommands.length) {
            return api.sendMessage(
              "🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n⚠️ No commands found in the specified category!\nTry another category or check the spelling. 🔍\n➤ Usage: store search category <category>\n━━━━━━━━━━━━━━━",
              event.threadID,
              event.messageID
            )
          }
          const commandList = filteredCommands.map((cmd, index) => 
            `${index + 1}- ${cmd.itemName}`
          ).join("\n")
          return api.sendMessage(
            `🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n📜 Commands in category "${category}":\n${commandList}\n━━━━━━━━━━━━━━━\nReply with the number of the command to buy (e.g., "1" for the first command).`,
            event.threadID,
            (err, info) => {
              if (err) return api.sendMessage(
                "❌ An error occurred while sending the message.",
                event.threadID, event.messageID
              )
              global.GoatBot.onReply.set(info.messageID, {
                commandName: "store",
                type: "select",
                messageID: info.messageID,
                commands: filteredCommands,
                userID: event.senderID,
                threadID: event.threadID,
                expiresAt: Date.now() + 300000
              })
            },
            event.messageID
          )
        } else {
          if (!args[1]) {
            return api.sendMessage(
              "🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n⚠️ Please specify the name of the command to search for!\n➤ Usage: store search <command name>\n━━━━━━━━━━━━━━━",
              event.threadID,
              event.messageID
            )
          }
          const cmdName = args.slice(1).join(" ")
          const response = await axios.get(`${serverURL}/api/commands/${cmdName}`)
          const item = response.data
          if (!Object.keys(item).length) {
            return api.sendMessage(
              "🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n⚠️ Command not found!\nThis command might be too common and has no value here.\nThis store is for elite commands only! 💎\n➤ Try using cmdstore for basic commands.\n━━━━━━━━━━━━━━━",
              event.threadID,
              event.messageID
            )
          }
          if (!Number.isFinite(item.price)) {
            return api.sendMessage(
              `🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n⚠️ The command "${cmdName}" has an invalid price!\nContact anAadministrator to fix this.\n━━━━━━━━━━━━━━━`,
              event.threadID,
              event.messageID
            )
          }
          const formattedPrice = formatNumber(item.price)
          return api.sendMessage(
            `🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n✅ Command "${item.itemName}" found!\nRank: ${item.rank}\nThe command costs ${formattedPrice} $.\nWould you like to pay to get it? 🛍️\nReply to this message with "yes" or "no".\n━━━━━━━━━━━━━━━`,
            event.threadID,
            (err, info) => {
              if (err) return api.sendMessage(
                "❌ An error occurred while sending the message.",
                event.threadID, event.messageID
              )
              global.GoatBot.onReply.set(info.messageID, {
                commandName: "store",
                type: "confirm",
                messageID: info.messageID,
                item: item,
                userID: event.senderID,
                threadID: event.threadID,
                expiresAt: Date.now() + 300000
              })
            },
            event.messageID
          )
        }
      }

      if (args[0]?.toLowerCase() === "put" && ADMIN_UID.includes(event.senderID)) {
        return api.sendMessage(
          "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n📝 Adding a new command.\nStep 1/6: Enter the command name (e.g., \"Join\"):\nReply to this message with the name, or type \"cancel\" to stop.\n━━━━━━━━━━━━━━━",
          event.threadID,
          (err, info) => {
            if (err) return api.sendMessage(
              "❌ An error occurred while sending the message.",
              event.threadID, event.messageID
            )
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "store",
              type: "put_form",
              step: 1,
              messageID: info.messageID,
              userID: event.senderID,
              threadID: event.threadID,
              expiresAt: Date.now() + 300000,
              formData: {}
            })
          },
          event.messageID
        )
      }

      return api.sendMessage(
        "🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n⚠️ Invalid command!\n➤ Usage: store page <number>\n➤ Usage: store search <command name>\n➤ Usage: store search category <category>\n━━━━━━━━━━━━━━━",
        event.threadID,
        event.messageID
      )
    } catch (error) {
      return api.sendMessage(
        "❌ An unexpected error occurred: " + error.message,
        event.threadID,
        event.messageID
      )
    }
  },

  onReply: async ({ api, event, message, Reply, usersData }) => {
    const { commandName, type, step, messageID, userID, threadID, expiresAt, formData, item, commands } = Reply

    if (event.senderID !== userID || event.threadID !== threadID) return

    if (Date.now() > expiresAt) {
      global.GoatBot.onReply.delete(messageID)
      return api.sendMessage(
        "🛒 〖 CommandStore 〗 🛒\n━━━━━━━━━━━━━━━\n⏳ Sorry, the time to respond to this request has expired (5 minutes).\nWould you like to start over?\n━━━━━━━━━━━━━━━",
        event.threadID,
        event.messageID
      )
    }

    if (commandName === "store" && type === "put_form") {
      const response = event.body.trim()
      const cancelCheck = response.toLowerCase()

      if (cancelCheck === "cancel") {
        global.GoatBot.onReply.delete(messageID)
        return api.sendMessage(
          "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n❌ Command addition canceled.\n━━━━━━━━━━━━━━━",
          event.threadID,
          event.messageID
        )
      }

      if (step === 1) {
        if (!response) {
          return api.sendMessage(
            "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n⚠️ The command name cannot be empty!\nStep 1/6: Enter the command name (e.g., \"Join\"):\n━━━━━━━━━━━━━━━",
            event.threadID,
            event.messageID
          )
        }
        formData.itemName = response
        return api.sendMessage(
          "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n📝 Step 2/6: Enter the author of the command (e.g., \"Vex_Kshitiz\"):\nReply to this message with the author, or type \"cancel\" to stop.\n━━━━━━━━━━━━━━━",
          event.threadID,
          (err, info) => {
            if (err) return api.sendMessage(
              "❌ An error occurred while sending the message.",
              event.threadID, event.messageID
            )
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "store",
              type: "put_form",
              step: 2,
              messageID: info.messageID,
              userID: event.senderID,
              threadID: event.threadID,
              expiresAt: Date.now() + 300000,
              formData
            })
          },
          event.messageID
        )
      }

      if (step === 2) {
        if (!response) {
          return api.sendMessage(
            "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n⚠️ The author of the command cannot be empty!\nStep 2/6: Enter the author of the command (e.g., \"Vex_Kshitiz\"):\n━━━━━━━━━━━━━━━",
            event.threadID,
            event.messageID
          )
        }
        formData.authorName = response
        return api.sendMessage(
          "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n📝 Step 3/6: Enter the rank of the command (e.g., \"C\"):\nReply to this message with the rank, or type \"cancel\" to stop.\n━━━━━━━━━━━━━━━",
          event.threadID,
          (err, info) => {
            if (err) return api.sendMessage(
              "❌ An error occurred while sending the message.",
              event.threadID, event.messageID
            )
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "store",
              type: "put_form",
              step: 3,
              messageID: info.messageID,
              userID: event.senderID,
              threadID: event.threadID,
              expiresAt: Date.now() + 300000,
              formData
            })
          },
          event.messageID
        )
      }

      if (step === 3) {
        if (!response) {
          return api.sendMessage(
            "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n⚠️ The rank of the command cannot be empty!\nStep 3/6: Enter the rank of the command (e.g., \"C\"):\n━━━━━━━━━━━━━━━",
            event.threadID,
            event.messageID
          )
        }
        formData.rank = response
        return api.sendMessage(
          "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n📝 Step 4/6: Enter the price of the command (e.g., \"10000000000\"):\nReply to this message with the price, or type \"cancel\" to stop.\n━━━━━━━━━━━━━━━",
          event.threadID,
          (err, info) => {
            if (err) return api.sendMessage(
              "❌ An error occurred while sending the message.",
              event.threadID, event.messageID
            )
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "store",
              type: "put_form",
              step: 4,
              messageID: info.messageID,
              userID: event.senderID,
              threadID: event.threadID,
              expiresAt: Date.now() + 300000,
              formData
            })
          },
          event.messageID
        )
      }

      if (step === 4) {
        const price = Number(response)
        if (isNaN(price) || price <= 0) {
          return api.sendMessage(
            `🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n⚠️ The price "${response}" must be a valid number greater than 0!\nStep 4/6: Enter the price of the command (e.g., "10000000000"):\n━━━━━━━━━━━━━━━`,
            event.threadID,
            event.messageID
          )
        }
        formData.price = price
        return api.sendMessage(
          "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n📝 Step 5/6: Enter the Pastebin link of the command (e.g., \"https://pastebin.com/raw/uWjDB6Zx\"):\nReply to this message with the link, or type \"cancel\" to stop.\n━━━━━━━━━━━━━━━",
          event.threadID,
          (err, info) => {
            if (err) return api.sendMessage(
              "❌ An error occurred while sending the message.",
              event.threadID, event.messageID
            )
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "store",
              type: "put_form",
              step: 5,
              messageID: info.messageID,
              userID: event.senderID,
              threadID: event.threadID,
              expiresAt: Date.now() + 300000,
              formData
            })
          },
          event.messageID
        )
      }

      if (step === 5) {
        if (!response || !response.startsWith("https://pastebin.com/")) {
          return api.sendMessage(
            "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n⚠️ The link must be a valid Pastebin link (e.g., \"https://pastebin.com/raw/uWjDB6Zx\")!\nStep 5/6: Enter the Pastebin link of the command:\n━━━━━━━━━━━━━━━",
            event.threadID,
            event.messageID
          )
        }
        formData.pastebinLink = response
        return api.sendMessage(
          "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n📝 Step 6/6: Enter the category of the command (e.g., \"Admin\"):\nReply to this message with the category, or type \"cancel\" to stop.\n━━━━━━━━━━━━━━━",
          event.threadID,
          (err, info) => {
            if (err) return api.sendMessage(
              "❌ An error occurred while sending the message.",
              event.threadID, event.messageID
            )
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "store",
              type: "put_form",
              step: 6,
              messageID: info.messageID,
              userID: event.senderID,
              threadID: event.threadID,
              expiresAt: Date.now() + 300000,
              formData
            })
          },
          event.messageID
        )
      }

      if (step === 6) {
        if (!response) {
          return api.sendMessage(
            "🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n⚠️ The category of the command cannot be empty!\nStep 6/6: Enter the category of the command (e.g., \"Admin\"):\n━━━━━━━━━━━━━━━",
            event.threadID,
            event.messageID
          )
        }
        formData.category = response
        const newCommand = {
          itemName: formData.itemName,
          authorName: formData.authorName,
          rank: formData.rank,
          price: formData.price,
          pastebinLink: formData.pastebinLink,
          category: formData.category
        }
        console.log("Data sent to the API:", newCommand)
        await axios.put(`${serverURL}/api/commands/${formData.itemName}`, newCommand)
        global.GoatBot.onReply.delete(messageID)
        return api.sendMessage(
          `🛠️ 〖 StoreAdmin 〗 🛠️\n━━━━━━━━━━━━━━━\n✅ Command "${formData.itemName}" added/updated successfully!\n━━━━━━━━━━━━━━━`,
          event.threadID,
          event.messageID
        )
      }
    }

    if (commandName === "store" && type === "select") {
      const choice = parseInt(event.body.trim())
      if (isNaN(choice) || choice < 1 || choice > commands.length) {
        return api.sendMessage(
          "🛒 〖 CommandStore 〗 ?
