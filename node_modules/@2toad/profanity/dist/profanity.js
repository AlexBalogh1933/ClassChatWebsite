"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profanity = exports.Profanity = void 0;
const profanity_options_1 = require("./profanity-options");
const models_1 = require("./models");
const misc_1 = require("./utils/misc");
const profane_words_1 = require("./data/profane-words");
class Profanity {
    constructor(options) {
        this.options = options || new profanity_options_1.ProfanityOptions();
        this.whitelist = new models_1.List(() => this.buildRegex());
        this.blacklist = new models_1.List(() => this.buildRegex());
        this.blacklist.addWords(profane_words_1.default);
    }
    exists(text) {
        this.regex.lastIndex = 0;
        return this.regex.test(text);
    }
    censor(text, censorType = models_1.CensorType.Word) {
        switch (censorType) {
            case models_1.CensorType.Word:
                return text.replace(this.regex, this.options.grawlix);
            case models_1.CensorType.FirstChar: {
                let output = text;
                Array.from(text.matchAll(this.regex)).forEach((match) => {
                    const word = match[0];
                    const grawlix = this.options.grawlixChar + word.slice(1, word.length);
                    output = output.replace(word, grawlix);
                });
                return output;
            }
            case models_1.CensorType.FirstVowel:
            case models_1.CensorType.AllVowels: {
                const regex = new RegExp("[aeiou]", censorType === models_1.CensorType.FirstVowel ? "i" : "ig");
                let output = text;
                Array.from(text.matchAll(this.regex)).forEach((match) => {
                    const word = match[0];
                    const grawlix = word.replace(regex, this.options.grawlixChar);
                    output = output.replace(word, grawlix);
                });
                return output;
            }
            default:
                throw new Error(`Invalid replacement type: "${censorType}"`);
        }
    }
    addWords(words) {
        this.blacklist.addWords(words);
    }
    removeWords(words) {
        this.blacklist.removeWords(words);
    }
    buildRegex() {
        const escapedBlacklistWords = this.blacklist.words.map(misc_1.escapeRegExp);
        const escapedWhitelistWords = this.whitelist.words.map(misc_1.escapeRegExp);
        const blacklistPattern = `${this.options.wholeWord ? "\\b" : ""}(${escapedBlacklistWords.join("|")})${this.options.wholeWord ? "\\b" : ""}`;
        const whitelistPattern = this.whitelist.empty ? "" : `(?!${escapedWhitelistWords.join("|")})`;
        this.regex = new RegExp(whitelistPattern + blacklistPattern, "ig");
    }
}
exports.Profanity = Profanity;
exports.profanity = new Profanity();
exports.default = exports.profanity;
//# sourceMappingURL=profanity.js.map