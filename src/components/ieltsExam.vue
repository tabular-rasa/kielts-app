<template>
  <div style="background-color: rgb(218, 228, 243);;">

    <div id="player">

      <div style=" width: 70%; height: 10%;">
        <audio controls="controls" style=" width: 100%; margin:10px 10px;">
          <source :src="voice" type="audio/wav">
        </audio>
      </div>
      <div style="margin:20px 20px;">
        <el-button id="form-button" type="primary" @click="submit">Submit</el-button>
        <el-button type="primary" @click="quit">Quit</el-button>
      </div>
    </div>
    <el-scrollbar height="80vh" id="exam" width="80vh">
      <form id="form-box">
        <div v-for="paper in paperList">
          <div v-html="format(paper)">
          </div>
        </div>
      </form>
    </el-scrollbar>
  </div>
  <el-footer style=" width: 70%; height: 15%;">Footer</el-footer>
</template>

<script>
import { ielts } from '../../api/index';
export default {
  data() {
    return {
      paperList: [],
      answerList: {},
      voice: ''
    }
  },
  created() {
    console.log(this.$route.query.paperId)
    ielts.getPaperDeatail(this.$route.query.paperId)
      .then(
        res => {
          this.paperList = res.data
          this.paperList.forEach(paper => {
            var key = paper.questionId + '-' + paper.questionType + '-input'
            if (!(key in this.answerList)) {
              this.answerList[key] = [];
            }
            // 将值添加到对应的数组中
            this.answerList[key].push(paper.rightAnswer);

          })
        })
  },
  mounted() {

    this.submit()
  },
  methods: {
    format(data) {
      if (data.questionType == 1) {
        var replacedContent = data.stem
        var inputCount = 1
        for (var i = 0; i < data.answerList.length; i++) {
          var inputName = data.questionId + '-' + data.questionType + '-input'
          var item = data.answerList[i];
          var inputElement = '<input type="radio" name="' + inputName + '" value="' + item.answerValue + '" />'
          var answer = '<div>' + inputElement + item.answer + '</div><br/>'
          replacedContent = replacedContent + answer
          inputCount++;
        }
        return replacedContent
      }
      if (data.questionType == 0) {
        var replacedContent = data.stem
        var inputCount = 1
        for (var i = 0; i < data.answerList.length; i++) {
          var inputName = data.questionId + '-' + data.questionType + '-input'
          var item = data.answerList[i];
          var inputElement = '<input type="checkbox" name="' + inputName + '" value="' + item.answerValue + '" />'
          var answer = '<div>' + inputElement + item.answer + '</div>'
          replacedContent = replacedContent + answer
          inputCount++;
        }
        return replacedContent
      }
      if (data.questionType == 2) {
        var inputCount = 1
        var replacedContent = data.stem.replace(/{{response}}/g, function () {
          var inputName = data.questionId + '-' + data.questionType + '-input'
          var inputElement = '<input type="text" name="' + inputName + '">';
          inputCount++;
          return inputElement;
        });
        return replacedContent
      }
    },
    submit() {

      //  1.监听表单的提交事件 
      $('#form-button').on('click', (e) => {
        e.preventDefault()                  // 2.阻止表单的默认行为
        var formdata = $('#form-box').serialize()
        var data = {}            // 3. 快速获取表单中的数据
        // 按照 & 分割每个键值对
        const pairs = formdata.split('&');
        // 遍历每个键值对
        pairs.forEach(pair => {
          // 按照 = 分割键和值
          const [key, value] = pair.split('=');
          // 检查键是否已存在，如果不存在则创建一个新的数组
          if (!(key in data)) {
            data[key] = [];
          }
          // 将值添加到对应的数组中
          data[key].push(value);

        });
        // 总得分
        var score = 0;
        if (data) {
          Object.keys(data).forEach(key => {
            var answersheet = data[key]
            const regex = /(?<=-)\d+/;
            var type = key.match(regex);
            var rightAnswer = this.answerList[key]
            if (rightAnswer) {
              rightAnswer = rightAnswer[0]
              if (type != 2) {
                for (var i = 0; i < rightAnswer.length; i++) {
                  if (rightAnswer.indexOf(answersheet[i]) > -1) {
                    score++;
                  }
                }
              } else {
                for (var i = 0; i < rightAnswer.length; i++) {
                  var answerSplit = rightAnswer[i]
                  if (answerSplit.indexOf(';') > -1) {
                    answerSplit = answerSplit.split(';')
                    if (answerSplit.indexOf(decodeURIComponent(answersheet[i])) > -1) {
                      score++;
                    }
                  } else if (answerSplit === answersheet[i]) {
                    score++;
                  }
                }
              }
            }

          })
        }
        console.log(score)
      })

    },
    quit() {
      const vm = this;
      vm.$router.push({ name: 'kieltsView' })
    }
  }
}
</script>

<style>
#exam {
  margin-left: 100px;
  margin-right: 100px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent;
  background-color: rgb(228, 234, 235);
  border-radius: 10px;
}

#player {
  width: 100%;
  align-items: center;
  background-color: rgb(218, 228, 243);
  display: flex;
}
</style>