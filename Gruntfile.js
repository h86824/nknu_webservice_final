module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // 引用 package.json 中的參數
        pkg: grunt.file.readJSON('package.json'),
        // JavaScript 合併
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                separator: ';',
                stripBanners: true
            },
            dist: {
                src: [
                    "public/javascripts/hs/hs.core.js",
                    "public/javascripts/hs/hs.core.js",
                    "public/javascripts/hs/hs.global.js",
                    "public/javascripts/hs/hs.method.js",
                    "public/javascripts/hs/hs.match.js",
                    "public/javascripts/hs/hs.card.js",
                    "public/javascripts/hs/hs.hero.js",
                    "public/javascripts/hs/hs.battle-field.js",
                    "public/javascripts/hs/hs.handArea.js",
                    "public/javascripts/hs/hs.battle-area.js",
                    "public/javascripts/hs/hs.button.js",
                    "public/javascripts/hs/hs.arrows-manager.js",
                    "public/javascripts/hs/hs.message-box.js",
                    "public/javascripts/hs/hs.bgm.js",
                    "public/javascripts/hs/hs.anime.js",
                    "public/javascripts/hs/hs.deck.js",
                    "public/javascripts/hs/hs.image-package.js",
                    "public/javascripts/hs/card/hs.card.Ahri.js",
                    "public/javascripts/hs/card/hs.card.Annie.js",
                    "public/javascripts/hs/card/hs.card.Ashe.js",
                    "public/javascripts/hs/card/hs.card.Azir.js",
                    "public/javascripts/hs/card/hs.card.Blitzcrank.js",
                    "public/javascripts/hs/card/hs.card.Braum.js",
                    "public/javascripts/hs/card/hs.card.Caitlyn.js",
                    "public/javascripts/hs/card/hs.card.Camille.js",
                    "public/javascripts/hs/card/hs.card.CCLin.js",
                    "public/javascripts/hs/card/hs.card.CPH.js",
                    "public/javascripts/hs/card/hs.card.DaMing.js",
                    "public/javascripts/hs/card/hs.card.Darius.js",
                    "public/javascripts/hs/card/hs.card.DyMing.js",
                    "public/javascripts/hs/card/hs.card.Flower.js",
                    "public/javascripts/hs/card/hs.card.GAYA.js",
                    "public/javascripts/hs/card/hs.card.Haru.js",
                    "public/javascripts/hs/card/hs.card.HauShiang.js",
                    "public/javascripts/hs/card/hs.card.Jan.js",
                    "public/javascripts/hs/card/hs.card.JianAn.js",
                    "public/javascripts/hs/card/hs.card.JiungHan.js",
                    "public/javascripts/hs/card/hs.card.Justin.js",
                    "public/javascripts/hs/card/hs.card.Kuo.js",
                    "public/javascripts/hs/card/hs.card.Lily.js",
                    "public/javascripts/hs/card/hs.card.LiWei.js",
                    "public/javascripts/hs/card/hs.card.Maple.js",
                    "public/javascripts/hs/card/hs.card.Poo.js",
                    "public/javascripts/hs/card/hs.card.WinTingLee.js",
                    "public/javascripts/hs/card/hs.card.Yee.js",
                    "public/javascripts/hs/card/hs.card.Yo.js",
                    "public/javascripts/hs/card/hs.card.YYT.js",
                    "public/javascripts/hs/action/hs.action.js",
                    "public/javascripts/hs/action/hs.action.dual.js",
                    "public/javascripts/hs/action/hs.action.end-turn.js",
                    "public/javascripts/hs/action/hs.action.play-card.js",
                    "public/javascripts/hs/action/hs.action.attack.js",
                    "public/javascripts/hs/card/hs.card.tinlee.js",
                    "public/javascripts/hs/card/hs.card.cclin.js",
                    "public/javascripts/hs/error/hs.error.type-error.js",
                    "public/javascripts/hs/hs.card-factory.js"
                ],
                dest: "public/hs.js"
            }
        },
        // 設定 JavaScript 壓縮 task
        uglifyjs: {
            options: {
            },
            dist: {
                files: {
                    'public/hs.min.js': 'public/hs.js'
                }
            }
        },
    });
 
    // Load the plugin.
    grunt.loadNpmTasks('grunt-contrib-concat');
 
    // Default task(s).
    grunt.registerTask('default', ['concat']);
};