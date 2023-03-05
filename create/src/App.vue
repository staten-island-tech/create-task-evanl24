<template>

  <div class="top">
    <h1 class="header">RPS-101</h1>
    <p class="subHeader">The classic game of Rock Paper Scissors, now with 98 more choices.</p>
  </div>

  <div class="inputs"> 
    <p>Select an object and click play to go up against an AI!</p>
    <select class="choiceList" id="choiceList">
      <option v-for="object in objects" :value=object> {{ object }} </option>
    </select>
    <Button class="button" @click="play()">Play</Button>
  </div>

  <div class="outcome">
    <p v-if="choices[1]"> AI chose {{ choices[1] }}</p>
    <p> {{ winner }} {{ outcome }} {{ loser }} </p>
    <p class="winner" v-if="winner"> {{ winner }} wins!</p>   
  </div>

  <div class="history">
    <h1 class="footer">History</h1>
    <p>{{ winCounter }} wins</p>
    <p>{{ lossCounter }} losses</p>
    <p>{{ drawCounter }} draws</p>
  </div>


</template>

<script>

  import axios from 'axios'
  import Button from './components/Button.vue'

  export default {
    name:'app',
    components: {
      Button,
    },
    data() {
      return {
        objects: [],
        choices: [],
        winner: '',
        outcome: '',
        loser: '',
        winCounter: 0,
        lossCounter: 0,
        drawCounter: 0,
      };
    },
    methods: {
      async getObjects () {
         const response = await axios.get('https://rps101.pythonanywhere.com/api/v1/objects/all')
         const info = response.data
      
        info.forEach(object => {
          this.objects.push(object)
        });
      },

      async play () {
         
          const userChoice = choiceList.value
          console.log(userChoice)

          const randomNum = function () {
            return Math.floor(Math.random() * 100);
          }

          const Number = randomNum()
          const computerChoice = this.objects[Number]
          console.log(computerChoice)
         
          this.choices.splice(0, 2)
          this.choices.push(userChoice, computerChoice)

          if (userChoice === computerChoice) {
            this.outcome = 'Draw!'
            this.drawCounter++
          } else {
            const outcomeResponse = await axios.get(`https://rps101.pythonanywhere.com/api/v1/match?object_one=${userChoice}&object_two=${computerChoice}`)
            const outcomeInfo = outcomeResponse.data
            console.log(outcomeInfo)
            
            this.winner = (outcomeInfo.winner)
            this.outcome = (outcomeInfo.outcome)
            this.loser = (outcomeInfo.loser)

            if (userChoice === this.winner) {
              this.winCounter++
            } else {
              this.lossCounter++
            }
          }
        }
    },
    beforeMount () {
      this.getObjects()
    }
  }
  

</script>

<style>

  .top {
    margin: 0rem;
    margin-bottom: 2rem;
    height: 10rem;
    background-color: #1f1f2e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .header {
    font-size: 4rem;
    margin: 0rem;
  }

  .subHeader {
    font-size: 1.2rem;
  }

  .inputs {
    font-size: 1.1rem;
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .choiceList {
    margin-bottom: 1rem;
  }

  .outcome {
    height: 9rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
  }

  .winner {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .history {
    font-size: 1.5rem;
  }

  .footer {
    font-size: 3rem;
    text-decoration-line: underline;
  }

</style>