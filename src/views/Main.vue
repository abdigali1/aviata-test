<template>
  <div class="main">
    <div class="main__header"></div>
    <div class="main__container">
      <div class="main__mobile-buttons" @click="activeMenu = !activeMenu">
        <p>фильтры</p>
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6464 6.64648L13.2929 4.00004L10.6464 1.35359L11.3535 0.646484L14 3.29293L16.6464 0.646484L17.3535 1.35359L14.7071 4.00004L17.3535 6.64648L16.6464 7.35359L14 4.70714L11.3535 7.35359L10.6464 6.64648ZM2.91465 4.00003H8C8 4.34074 8.0284 4.67482 8.08296 5.00003H2.91465C2.70873 5.58263 2.15311 6.00003 1.5 6.00003C0.671573 6.00003 0 5.32846 0 4.50003C0 3.6716 0.671573 3.00003 1.5 3.00003C2.15311 3.00003 2.70873 3.41743 2.91465 4.00003ZM7.91465 8.00003H9.52779C9.86799 8.38014 10.2559 8.71661 10.6822 9.00003H7.91465C7.70873 9.58263 7.15311 10 6.5 10C5.84689 10 5.29127 9.58263 5.08535 9.00003H0.5C0.223858 9.00003 0 8.77617 0 8.50003C0 8.22389 0.223858 8.00003 0.5 8.00003H5.08535C5.29127 7.41743 5.84689 7.00003 6.5 7.00003C7.15311 7.00003 7.70873 7.41743 7.91465 8.00003ZM2.91465 12C2.70873 11.4174 2.15311 11 1.5 11C0.671573 11 0 11.6716 0 12.5C0 13.3285 0.671573 14 1.5 14C2.15311 14 2.70873 13.5826 2.91465 13H14.5C14.7761 13 15 12.7762 15 12.5C15 12.2239 14.7761 12 14.5 12H2.91465Z" fill="#5763B3"/>
        </svg>
      </div>
      <div class="main__menu menu" :class="{ 'active': activeMenu }">
        <div class="menu__content">
          <div class="menu__filter-block filter-block">
            <div class="filter-block__filter">
              <h3 class="filter-block__title">Опции тарифа</h3>
              <div class="filter-block__form">
                <Checkbox v-for="option in options" :key="option.id" :label="option.text" :passedValue="option.id" v-model="selectedOption" />
              </div>
            </div>
            <div class="filter-block__filter">
              <h3 class="filter-block__title">Авиакомпании</h3>
              <div class="filter-block__form filter-block_static-height">
                <Checkbox v-for="(value, name) in getAirlines()" :key="name" :label="value" :passedValue="name" v-model="selectedAirlines" />
              </div>
            </div>
            <p class="filter-block__discard-text dashed-underline">Сбросить все фильтры</p>
          </div>
        </div>
      </div>
      <div class="main__search"></div>
      <div class="main__row">
        <div class="main__col">
          <div class="main__filter-block filter-block">
            <div class="filter-block__filter">
              <h3 class="filter-block__title">Опции тарифа</h3>
              <div class="filter-block__form">
                <Checkbox v-for="option in options" :key="option.id" :label="option.text" :passedValue="option.id" v-model="selectedOption" />
              </div>
            </div>
            <div class="filter-block__filter">
              <h3 class="filter-block__title">Авиакомпании</h3>
              <div class="filter-block__form filter-block_static-height">
                <Checkbox v-for="(value, name) in getAirlines()" :key="name" :label="value" :passedValue="name" v-model="selectedAirlines" />
              </div>
            </div>
            <p class="filter-block__discard-text dashed-underline">Сбросить все фильтры</p>
          </div>
        </div>
        <div class="main__col">
          <div class="main__flight-list">
            <div class="main__flight-block flight-block" v-for="flight in getFilteredFlights" :key="flight.id">
              <div class="flight-block__info">
                <div class="flight-block__row">
                  <div class="flight-block__flight-company">
                    <img :src="`https://aviata.kz/static/airline-logos/80x80/${flight.carrier}.png`" alt="">
                    <p v-text="flight.carrier_name"></p>
                  </div>
                  <div class="flight-block__flight-info desktop">
                    <div class="flight-block__time-block">
                      <p class="flight-block__date" v-text="flight.segments[0].dep_time.slice(0, 11)"></p>
                      <p class="flight-block__time" v-text="flight.segments[0].dep_time.slice(11,)"></p>
                    </div>
                    <div class="flight-block__stop-info">
                      <div class="flight-block__stop-abbr">
                        <p v-text="flight.segments[0].origin_code"></p>
                        <p class="flight-block__stop-time" v-text="calculateRange(flight.traveltime)"></p>
                        <p v-text="flight.layovers.length ? flight.segments[1].dest_code : flight.segments[0].dest_code"></p>
                      </div>
                      <div class="flight-block__line">
                        <div class="flight-block__dot"></div>
                        <div class="flight-block__dot" v-show="flight.layovers.length"></div>
                        <div class="flight-block__dot"></div>
                      </div>
                      <div class="flight-block__stop-loc" v-if="flight.layovers.length">
                        <p v-text="`через ${flight.segments[0].airport_dest}, ${calculateRange(flight.layovers[0])}`"></p>
                      </div>
                    </div>
                    <div class="flight-block__time-block">
                      <p class="flight-block__date" v-text="flight.layovers.length ? flight.segments[1].arr_time.slice(0, 11) : flight.segments[0].arr_time.slice(0, 11)"></p>
                      <p class="flight-block__time" v-text="flight.layovers.length ? flight.segments[1].arr_time.slice(11,) : flight.segments[0].arr_time.slice(11,)"></p>
                    </div>
                  </div>
                  <div class="flight-block__flight-info mobile">
                    <div class="flight-block__mobile-row">
                      <div class="flight-block__time-block">
                        <p class="flight-block__date" v-text="flight.segments[0].dep_time.slice(0, 11)"></p>
                        <p class="flight-block__time" v-text="flight.segments[0].dep_time.slice(11,)"></p>
                      </div>
                      <div class="flight-block__time-block">
                        <p class="flight-block__date" v-text="flight.layovers.length ? flight.segments[1].arr_time.slice(0, 11) : flight.segments[0].arr_time.slice(0, 11)"></p>
                        <p class="flight-block__time" v-text="flight.layovers.length ? flight.segments[1].arr_time.slice(11,) : flight.segments[0].arr_time.slice(11,)"></p>
                      </div>
                    </div>
                    <div class="flight-block__stop-info">
                      <div class="flight-block__stop-abbr">
                        <p v-text="flight.segments[0].origin_code"></p>
                        <p class="flight-block__stop-time" v-text="calculateRange(flight.traveltime)"></p>
                        <p v-text="flight.layovers.length ? flight.segments[1].dest_code : flight.segments[0].dest_code"></p>
                      </div>
                      <div class="flight-block__line">
                        <div class="flight-block__dot"></div>
                        <div class="flight-block__dot" v-show="flight.layovers.length"></div>
                        <div class="flight-block__dot"></div>
                      </div>
                      <div class="flight-block__stop-loc" v-if="flight.layovers.length">
                        <p v-text="`через ${flight.segments[0].airport_dest}, ${calculateRange(flight.layovers[0])}`"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flight-block__row">
                  <p class="dashed-underline">Детали перелета</p>
                  <p class="dashed-underline">Условия тарифа</p>
                  <div class="flight-block__irrevocable" v-if="!flight.refundable">
                    <img src="@/assets/icons/irrevocable.svg" alt="">
                    <p>невозвратный</p>
                  </div>
                </div>
              </div>
              <div class="flight-block__order">
                <div class="flight-block__price">
                  <p v-text="flight.price.amount">590 240</p>
                  <span>₸</span>
                </div>
                <Button class="flight-block__order-btn" label="Выбрать" />
                <p class="flight-block__passenger-price">Цена за всех пассажиров</p>
                <div class="flight-block__bagage-info" :class="{ 'center': flight.segments[0].baggage_options[0].value == 0 }">
                  <p>Нет багажа</p>
                  <AddButton v-if="flight.segments[0].baggage_options[0].value !== 0" label="+ Добавить багаж" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from '@/components/elements/Checkbox.vue'
import Button from '@/components/elements/Button.vue'
import AddButton from '@/components/elements/AddButton.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Main',
  components: {
    Checkbox,
    Button,
    AddButton
  },
  data () {
    return {
      airlines: [],
      selectedOption: [],
      selectedAirlines: ["all"],
      activeMenu: false,
      options: [
				{
					id: 1,
          text: 'Только прямые'
				},
				{
					id: 2,
          text: 'Только с багажом'
				},
				{
					id: 3,
          text: 'Только возвратные'
				}
			]
    }
  },
  created() {
    this.readJsonAction()
  },
  methods: {
    ...mapActions({
      readJsonAction: 'readJson'
    }),
    ...mapGetters([
      'getFlights',
      'getAirlines'
    ]),
    calculateRange(time) {
      const h = Math.floor(time / 3600);
      const m = Math.floor(time % 3600 / 60);
      return `${h} час ${m} м`
    },
  },
  watch: {
    activeMenu: function() {
      if(this.activeMenu){
        document.documentElement.style.overflow = 'hidden'
        return
      }

      document.documentElement.style.overflow = 'auto'
    }
  },
  computed: {
    // Ужасный фильтр
    getFilteredFlights() {
      let check = this.selectedAirlines.some(elem => elem === 'all')
      console.log(check);
      if(check || !this.selectedAirlines.length) return this.getFlights()
      else if(!check) { 
        return this.getFlights().filter(elem => elem.carrier === this.selectedAirlines[0])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_typography";
@import "@/assets/styles/_colors";

.main {
  margin: 0 15px;
  &__container {
    max-width: 1140px;
    margin: 0 auto;
  }
  &__header {
    width: calc(100% + 30px);
    margin-left: -15px;
    height: 100px;
    background-color: $bg-block-color;
  }
  &__search {
    width: 100%;
    height: 111px;
    background-color: $bg-block-color;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    
    margin: 20px 0 72px 0;
  }
  &__col {
    display: flex;
    justify-content: space-between;

    &:first-child {
      width: 21%;
      position: sticky;
      height: 100%;
      top: 12px;
    }
    &:last-child {
      width: 77%;
    }
  }
  &__row {
    display: flex;
    justify-content: space-between;
  }
  &__flight-list {
    width: 100%;
  }
  &__mobile-buttons {
    display: none;
  }
  @media only screen and (max-width: 776px) {
    &__col {
      &:first-child {
        display: none;
      }
      &:last-child {
        width: 100%;
      }
    }
    &__filter-block {
      display: none;
    }
    &__mobile-buttons {
      position: fixed;
      bottom: 20px;
      left: 50%; transform: translateX(-55px);
      width: 100px;
      padding: 10px 20px;
      margin: 0 auto;
      background-color: $bg-mobile-menu;
      color: $text-blue;
      text-align: center;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
      border-radius: 6px;
      z-index: 10;
      display: flex;
      align-items: center;
      transition: 0.4s all ease;

      & svg {
        height: 15px;
        margin-left: 5px;
      }
    }
    &__mobile-buttons:active {
      background-color: $bg-mobile-btn-darker-color;
      transform: translateX(-54px);
      bottom: 18px;
      transition: 0.4s all ease;
    }
  }
}
.menu {
  position: fixed;
  left: -100%;
  bottom: 0;
  top: 0;
  right: unset;
  background-color: $bg-color;
  padding: 15px 15px;
  z-index: 5;
  transition: .5s all ease;

  &.active {
    left: 0;
    width: calc(100% - 30px);
    transition: .4s all ease;
  }
}
.filter-block {
  width: 100%;

  &__filter {
    background-color: $bg-filter-block-color;
    border-radius: 4px;
    padding: 12px 4px 12px 12px;

    &:first-child {
      margin-bottom: 12px;
    }
  }
  &__title {
    @include textMixin($w: bold, $fs: 14px, $lh: 20px);

    margin-bottom: 16px;
  }
  &__discard-text {
    margin: 13px 0 13px 0;
  }
  &_static-height {
    height: 248px;
    overflow-y: scroll;
  }
  ::-webkit-scrollbar {
    width: 2px;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-track {
    background: $bg-filter-block-color; 
  }
  ::-webkit-scrollbar-thumb {
    background: $bg-scroll_color; 
  }
  ::-webkit-scrollbar-thumb:hover {
    background: $bg-scroll_color; 
  }
}
.flight-block {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 168px;
  display: flex;

  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 44px;
  }
  &__info {
    width: 70%;
    background-color: $bg-block-color;
    padding: 40px 43px 16px 43px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border-radius: 4px 0 0 4px;
  }
  &__row {
    display: flex;
    align-items: center;

    &:last-child {
      p {
        margin-right: 23px;
      }
    }
  }
  &__flight-company {
    width: 25%;
    display: flex;
    align-items: center;
    > p {
      @include textMixin($w: 600, $fs: 14px, $lh: 19px);
    }
    > img {
      height: 20px;
      margin-right: 12px;
    } 
  }
  &__flight-info {
    width: 75%;
    display: flex;
    align-items: center;
  }
  &__time-block {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__date {
    text-transform: lowercase;
    @include textMixin($w: normal, $fs: 12px, $lh: 16px);
  }
  &__time {
    @include textMixin($w: 600, $fs: 24px, $lh: 33px);
  }
  &__stop-info {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__stop-abbr {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include textMixin($w: normal, $fs: 10px, $lh: 12px, $c: $text-light-gray);

    margin-bottom: 3.5px;
  }
  &__stop-time {
    @include textMixin($w: normal, $fs: 12px, $lh: 18px);
  }
  &__line {
    width: 100%;
    height: 1px;
    background-color: $bg-light-gray-color;
    position: relative;

    margin-bottom: 4.5px;
  }
  &__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: 1px solid $bg-light-gray-color;
    position: absolute;
    top: -2.5px;
    background-color: $bg-block-color;

    &:first-child {
      left: 0;
    }
    &:nth-child(2) {
      left: 50%; margin-left: -2px;
    }
    &:nth-child(3) {
      right: 0;
    }
  }
  &__stop-loc {
    @include textMixin($w: normal, $fs: 12px, $lh: 16px, $c: $text-orange);
  }
  &__irrevocable {
    display: flex;
    align-items: center;
    @include textMixin($w: normal, $fs: 12px, $lh: 14px);
    > img {
      width: 15px;
      margin-right: 7px;
    }
  }
  &__order {
    width: 30%;
    background-color: $bg-filter-block-color;
    padding: 12px 20px 15px 20px;
    border-radius: 0 4px 4px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__price {
    text-align: center;
    display: flex;

    margin-bottom: 13px;

    p {
      @include textMixin($w: normal, $fs: 24px, $lh: 28px);
    }
    span {
      position: relative;
      top: 9px;
      left: 5px;
    }
  }
  &__order-btn {
    width: 100%;
    margin-bottom: 8px;
    transition: 0.2s all ease-in;
  }
  &__order-btn:hover { 
    transition: 0.2s all ease-in;
    background-color: #4faf06;
    transform: translate(1px, 1px);
  }
  &__bagage-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include textMixin($w: normal, $fs: 12px, $lh: 16px);
  }
  &__passenger-price {
    margin-bottom: 12px;
    @include textMixin($w: normal, $fs: 12px, $lh: 16px, $c: $text-light-gray);
  }
  @media only screen and (max-width: 1050px) {
    &__bagage-info {
      display: flex;
      flex-direction: column;
    }
    &__passenger-price {
      margin-bottom: 0;
    }
  }
  @media only screen and (max-width: 992px) {
    display: flex;
    flex-direction: column;
    height: auto;
    
    &__info, &__order {
      width: auto;
    }
    &__info {
      padding: 20px 23px 16px 23px;
      border-radius: 4px 4px 0 0;
    }
    &__order-btn {
      width: 25%;
    }
    &__order {
      border-radius: 0 0 4px 4px;
    }
    &__bagage-info {
      p {
        margin-bottom: 5px;
      }
    }
    &__passenger-price {
      margin-bottom: 5px;
    }
    &__row {
      &:first-child {
        margin-bottom: 30px;
      }
    }
  }
  @media only screen and (max-width: 550px) {
    &__row {
      &:first-child {
        display: flex;
        flex-direction: column;
      }
      &:last-child {
        white-space: nowrap;
        flex-wrap: wrap;
      }
    }
    &__flight-info {
      width: 100%;
    }
    &__order-btn {
      width: 100%;
    }
    &__flight-company {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 10px;
      img {
        height: 30px;
      }
      p {
        @include textMixin($w: 600, $fs: 20px, $lh: 26px);
      }
    }
    &__stop-info {
      width: 100%;
    }
    &__mobile-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dashed-underline {
      margin-bottom: 10px;
    }
  }
}
.dashed-underline {
  display: inline-block;
  @include dashedLink();
}
.mobile {
  display: none;

  @media only screen and (max-width: 550px) {
    display: block;
  }
}
.desktop {
  display: inherit;

  @media only screen and (max-width: 550px) {
    display: none;
  }
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
@keyframes shake {
  25% { transform: translateY(1px)}
  50% { transform: translateY(0)}
  75% { transform: translateY(1px)}
}
</style>