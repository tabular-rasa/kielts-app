<template>
  <div>
    <div id="title" style=" height: 10%;">
      最 终 成 绩
    </div>
    <div id="grade">
      {{ score }}/10
    </div>
    <div id="sheet">

      <div id="left-sheet">

      </div>
      <div id="right-sheet">

      </div>
    </div>

    <el-button style="height: 45px;" @click="quit"> 确定</el-button>
  </div>
</template>

<script >
import { useStore } from 'vuex'
const store = useStore()
export default {
  data() {
    return {
      score: 0,
      answerList: {},
      actualAnswer: {}
    }
  },
  created() {
    this.answerList = {}
    this.actualAnswer = {}
  },
  mounted() {
    this.score = this.$route.query.score
    var answer = this.$store.state.answerList
    var actual = this.$store.state.actualAnswer

    this.answerList = JSON.parse(JSON.stringify(answer))
    this.actualAnswer = JSON.parse(JSON.stringify(actual))
    this.showResult()
  },
  methods: {
    showResult() {
      $('#left-sheet').empty();
      $('#right-sheet').empty();
      var titleleft = '<div class="sub-title" style=" text-align: center; font-size: 20px;"> 正确答案 </div>'
      var titleright = '<div class="sub-title" style=" text-align: center; font-size: 20px;"> 你的答案 </div>'
      $(titleleft).appendTo($('#left-sheet'))
      $(titleright).appendTo($('#right-sheet'))
      Object.keys(this.answerList).forEach(key => {
        var rightAnswer = this.answerList[key]
        var userAnswer = this.actualAnswer[key]
        const regex = /(?<=-)\d+/;
        var type = key.match(regex);

        //非多选题
        if (type != 0) {
          for (var i = 0; i < rightAnswer.length; i++) {
            //正确答案
            var answerLeft = rightAnswer[i]
            //用户答案
            if (userAnswer.length == 0) {
              var answerRight = ""
            } else {
              var answerRight = userAnswer[i]
            }
            var line = '<div class="answerline" style="border-radius: 10px; padding: 5px; margin-bottom: 5px; border: 2px solid #000000; background-color: #ccccff; height:25px;">' + answerLeft + '</div>'
            $(line).appendTo($('#left-sheet'))
            var line2 = '<div class="answerline" style="border-radius: 10px; padding: 5px; margin-bottom: 5px; border: 2px solid #000000; background-color: #99ccff; height:25px;">' + answerRight + '</div>'
            $(line2).appendTo($('#right-sheet'))
          }
        } else {
          var answerLeft = " "
          for (var i = 0; i < rightAnswer.length; i++) {
            answerLeft = answerLeft.concat(rightAnswer[i], ";")
          }
          var line = '<div class="answerline" style="border-radius: 10px; padding: 5px; margin-bottom: 5px; border: 2px solid #000000; background-color: #ccccff; height:25px;">' + answerLeft + '</div>'
          $(line).appendTo($('#left-sheet'))


          var answerRight = " "
          for (var i = 0; i < userAnswer.length; i++) {
            answerRight = answerRight + userAnswer[i] + ";"
          }
          var line2 = '<div class="answerline" style="border-radius: 10px; padding: 5px; margin-bottom: 5px; border: 2px solid #000000; background-color: #99ccff; height:25px;">' + answerRight + '</div>'
          $(line2).appendTo($('#right-sheet'))
        }

      }
      )
    },
    quit() {
      this.$router.push({ name: 'kieltsView' })
    }
  }
}
</script>

<style scoped>
* {
  font-family: "fangzheng";
  text-align: center;
  transition: all .3s;
  font-size: 40px;
}

#title {
  width: 100%;
  background-color: rgb(218, 228, 243);
}


#sheet {
  display: flex;
  justify-content: center;
  text-align: center;
}

#left-sheet {
  font-size: 20px;
  font-family: "Arial";
  text-align: left;
  margin-right: 50px;
  display: inline-block;
  width: 50%;
}


#right-sheet {
  font-size: 20px;
  font-family: "Arial";
  text-align: left;
  margin-left: 50px;
  display: inline-block;
}
</style>