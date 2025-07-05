<template>
	<v-dialog
		v-model="dialog"
		max-width="550"
		persistent
	>
		<v-card>
			<v-alert dense :type="!hasError ? 'success' : 'error'">
				<b class="text-2xl">{{ !hasError ?  $t('common.message') : $t('common.error') }}</b>
			</v-alert>

			<v-card-text class="black--text">
				<div v-if="!Array.isArray(popupContent)">
          {{ popupContent }}
        </div>
				<ul class="ul-1" v-else>
					<li v-for="(val, key) in popupContent" :key="key">
						{{ val }}
					</li>
				</ul>
			</v-card-text>
			<v-card-actions class="sticky-box">
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					elevation="0"
					@click="onClose"
					style="min-width: 120px"
				>
					{{ $t('common.close') }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'GlobalMessagePopup',
  data () {
    return {
      dialog: false,
    }
  },
	computed: {
    ...mapState({
      message: state => state.appDialog.appMessage,
      hasError: state => state.appDialog.hasError
    }),
    popupContent () {
      if (this.message?.constructor !== Object) return this.message;
			return this.getContent(this.message);
    },
	},
  watch: {
    message (val) {
      this.dialog = !!val;
    }
  },
	methods: {
    ...mapMutations(['setMessage']),
    onClose () {
			this.dialog = false;

      setTimeout(() => {
				this.setMessage();
			}, 800);
    },
    getContent (message = {}) {
			if (!this.hasError) return message;
			// bug 500, 404, or undefined bugs from the serser
			const messageData = message.data;
			if (
        !Object.keys(messageData || {}).length
			) {
				return message.error || message;
			}

      /**
			 * Error response format
			 * from server (may be changed):
			 * message = {
			 *  data: {
			 *   data: {...}
			 *  },...
			 * }
			 */
			message.errors = JSON.parse(JSON.stringify(messageData));

      const messageArr = [];
      for (const key in message.errors) {
        messageArr.push( message.errors[key])
      }

      return [...messageArr];
    }
	},
};
</script>
<style lang="scss" scoped>
.ul-1 {
	list-style-type: none;
	li {
		&:not(:last-child) { margin-bottom: 12px; }
	}
}
.sticky-box {
	position: sticky;
	bottom: -1px;
	background: white;
}
</style>
