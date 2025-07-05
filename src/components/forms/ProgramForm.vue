<template>
  <v-form
    ref="formRef"
    class="pt-1"
    @submit.prevent="onSubmit"
  >
    <v-row>
      <v-col cols="12" md="3">
        <label class="d-block label-important mb-1">
          {{ $t('program.category') }}
        </label>
        <LazySelectInput
          v-model="mainForm.programCategory"
          :items="categoryList"
          :rules="emptyRules"
          item-text="name"
          item-value="id"
          hide-details="auto"
          attach
          outlined
          dense
          clearable
        />
      </v-col>

      <v-col cols="12" md="6">
        <label class="d-block label-important mb-1">
          {{ $t('program.columns.programName') }}
        </label>
        <v-text-field
          v-model="mainForm.name"
          :rules="[...emptyRules, ...maxLength255Rules]"
          hide-details="auto"
          outlined dense
        />
      </v-col>

      <v-col cols="12" md="3">
        <div class="max-w-md">
          <label class="d-block label-default mb-1">
            {{ $t('program.uploadDocument') }}
          </label>
          <DocFile
            :value="mainForm.document"
            :hasMarginBottom="false"
            :placeholder="$t('program.uploadDocument')"
            :limitSize="5"
            defaultType
            prepend-icon="far fa-cloud-upload"
            @change="uploadDoc('document', $event)"
            @remove="uploadDoc('document', null)"
          />
          <p class="italic text-xs mb-0" style="margin-top: 2px;">
            ({{ $t('program.limitSize', {limit: 5}) }})
          </p>
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <label class="d-block label-important mb-1">
          {{ $t('program.columns.duration') }}
        </label>
        <InputCurrency
          v-model="mainForm.hour"
          :rules="[...emptyRules, ...numberZeroToOneMil]"
        />
      </v-col>

      <v-col cols="12" md="3">
        <label class="d-block label-important mb-1">
          {{ $t('program.columns.price') }}
          (<v-icon size="13" color="black">fas fa-euro</v-icon>)
        </label>
        <InputCurrency
          v-model="mainForm.price"
          :rules="emptyRules"
        />
      </v-col>

      <v-col cols="12" md="3">
        <label class="d-block label-important mb-1">
          {{ $t('program.columns.format') }}
        </label>
        <v-select
          v-model="mainForm.format"
          :items="formats"
          :rules="emptyRules"
          item-text="name"
          item-value="id"
          hide-details="auto"
          attach
          outlined
          dense
        ></v-select>
      </v-col>

      <v-col cols="12" md="3">
        <label class="d-block label-important mb-1">
          {{ $t('program.columns.language') }}
        </label>
        <v-select
          v-model="mainForm.language"
          :items="languages"
          :rules="emptyRules"
          item-text="name"
          item-value="id"
          hide-details="auto"
          attach
          outlined
          dense
        ></v-select>
      </v-col>

      <v-col cols="12" md="3">
        <label class="d-block label-default mb-1">
          {{ $t('program.columns.certification') }}
        </label>
        <v-text-field
          v-model="mainForm.certification"
          hide-details="auto"
          outlined dense
        />
      </v-col>

      <v-col cols="12" md="3">
        <label class="d-block label-default mb-1">
          {{ $t('program.columns.componentBlock') }}
        </label>
        <v-text-field
          v-model="mainForm.blockComponent"
          outlined
          dense
          hide-details="auto"
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="mt-4 flex justify-center">
      <BtnSubmit :loading="loading" @click="onSubmit" />
    </div>
  </v-form>
</template>
<script>
import {
  BOOLEAN_TYPES,
  LANGUAGES,
  FORMAT_LIST
} from '@/utils/constant';
import InputCurrency from '@/components/InputCurrency.vue';
import BtnSubmit from '@/components/BtnSubmit.vue';
import DocFile from '@/components/FileUpload/DocFile.vue';
import LazySelectInput from '@/components/LazySelectInput.vue';

const INIT_FORM = {
  programCategory: null,
  name: '',
  hour: '',
  price: null,
  format: null,
  language: '',
  certification: null,
  blockComponent: '',
  document: null
};

export default {
  name: "ProgramForm",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    BtnSubmit,
    InputCurrency,
    DocFile,
    LazySelectInput
  },
  data: () => ({
    mainForm: structuredClone(INIT_FORM),
    backupForm: structuredClone(INIT_FORM),
    errors: {}
  }),
  computed: {
		booleanTypes () {
			return [...BOOLEAN_TYPES];
		},
		languages () {
			return [...LANGUAGES];
		},
		formats () {
      return [...FORMAT_LIST];
		},
    categoryList() {
			return this.$store.getters.getList('programCateList');
		},
  },
  watch: {
    form: {
      handler(val) {
        this.mainForm = {
          ...this.mainForm,
          ...val
        };
      },
      immediate: true
    }
  },
  methods: {
    scrollToErrorEl () {
      const el = this.$refs.formRef?.$el.querySelector('.v-input.error--text');
      if (el) {
        document.querySelector('.form-main')?.scrollTo({ top: el.offsetTop - 50, behavior: 'smooth' });
      }
    },
    uploadDoc (key = '', val) {
      if (!key) return false;

			this.mainForm[key] = val;
    },
    async onSubmit () {
      if (!this.$refs.formRef?.validate()) {
        this.$nextTick(() => {
          this.scrollToErrorEl();
        });

        return false;
      }

      this.$emit('onSubmit', this.mainForm);
    }
  }
};
</script>
