import { computed, defineComponent, ref, watch,onMounted } from 'vue';
export interface UseInputNumberOptions {
  // getElement?: () => EnhancedHTMLElement
  // onFullscreenChange?: (state: boolean) => void
  numberType?:string // positive\negative\float  默认为正负整数
  initValue?:string
}

const isPositiveNum=(numberType)=>numberType.split('-').find(item=>item==='positive')!=undefined
const isNegaTiveNum=(numberType)=>numberType.split('-').find(item=>item==='negative')!=undefined
const includeFloatNum=(numberType)=>numberType.split('-').find(item=>item==='float')!=undefined

const getRegString=(numberType)=>{
    const isPositive=isPositiveNum(numberType)
    const isNegaTive=isNegaTiveNum(numberType)
    const includeFloat=includeFloatNum(numberType)
      //  /^-?\d*(\.\d*)?$/
      return eval(`/^${isPositive? '':'-'}${isNegaTive||isPositive?'':'?'}\\d*${includeFloat? '(\\.\\d*)?':''}$/`)
}

// 可输入小数/负数
export const useInputNumberFormater = ({initValue='',numberType=''}: UseInputNumberOptions = {}) => {
  const inputValue = ref<string>(initValue);
  watch(inputValue, (val, preVal) => {
    format(val, preVal);
  });

  function formatNumber(value: string) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
  
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
  
    if (num) {
      result = num + result;
    }
  
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }

  // 根据inputValue显示另一种格式
  const formatValue = computed(() => {
    if (inputValue.value === '-') return '-';
    return formatNumber(inputValue.value);
  });


  const format = (val: string, preVal: string) => {
    
      const reg =getRegString(numberType);
      if ((!isNaN(+val) && reg.test(val)) || val === '' || (!isPositiveNum(numberType) && val === '-')) {
        inputValue.value = val;
      } else {
        inputValue.value = preVal;
      }
  };

  // '.' at the end or only '-' in the input box.
  const onBlur = () => {
    if (
      inputValue.value.charAt(inputValue.value.length - 1) === '.' ||
      inputValue.value === '-'
    ) {
      format(inputValue.value.slice(0, -1), inputValue.value);
    }
  };


  return {
    inputValue,
    onBlur,
    formatValue,
  }
}
  