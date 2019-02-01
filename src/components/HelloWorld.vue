<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <ul>
      <li v-for="test in tests" v-bind:key="test.id">
       {{test.id}} | {{test.test_id}} | {{test.test_description}}
      </li>
    </ul>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'HelloWorld',
  data () {
    return {
      tests: []
    }
  },
  created () {
    db.collection('test').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.data());
        const data = {
          'id': doc.id,
          'test_id': doc.data().test_id,
          'test_description': doc.data().test_description
        }
        this.tests.push(data)
      })
    })
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
