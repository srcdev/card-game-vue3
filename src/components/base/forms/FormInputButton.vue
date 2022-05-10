<template>
  <div class="control control-button" :class="[{ 'icon-only': isIconOnly }, { 'has-icons-left': hasIconsLeft }, { 'has-icons-right': hasIconsRight }, { 'field-addon-right': isFieldAddOnRight }]">
    <button :type="buttonType" class="is-rounded" :class="[inputClasses, { 'has-icons-left': hasIconsLeft }, { 'has-icons-right': hasIconsRight }]" :disabled="submitDisabled" :aria-disabled="submitDisabled" :data-testid="`${dataTestid}-${inputTestid}`">
      <Loading v-if="displayLoader" :loading-type="loadingType" :no-opacity="true" />
      <span :class="[{ 'access-hidden': isIconOnly }]">{{ submitText }}</span>
      <slot name="iconOnly"></slot>
    </button>
    <slot name="iconsLeft"></slot>
    <slot name="iconsRight"></slot>
  </div>
</template>

<script type="ts">

import { defineComponent } from "vue";
import Loading from "@/components/base/loading/Loading.vue";

export default defineComponent({
	name: 'FormInputSubmit',
	components: {
		Loading
	},
	props: {
		dataTestid: {
			type: String,
			default: ''
		},
		inputClasses: {
			type: [Array, String],
			default: ''
		},
    displayLoader: {
			type: Boolean,
			default: false
    },
		inputTestid: {
			type: String,
			default: ''
		},
		submitDisabled: {
			type: Boolean,
			default: false
		},
		submitText: {
			type: [Number, String],
			default: null
		},
    loadingType: {
      type: String,
      default: "asyncLoad",
    },
    buttonType: {
      type: String,
      default: "button",
    },
    isFieldAddOnRight: {
			type: Boolean,
			default: false
		},
	},
	computed: {
    isIconOnly() {
      return this.$slots.iconOnly && this.$slots.iconOnly().findIndex(o => o.type !== Comment) !== -1;
    },
    hasIconsLeft() {
      return this.$slots.iconsLeft && this.$slots.iconsLeft().findIndex(o => o.type !== Comment) !== -1;
    },
    hasIconsRight() {
      return this.$slots.iconsRight && this.$slots.iconsRight().findIndex(o => o.type !== Comment) !== -1;
    },
	},});
</script>
<style lang="scss">
@import "@/assets/styles/imports.scss";

.control {
  // &.actions {
  //   top: 0;
  //   margin-top: 20px;
  // }

  &.icon-only {
    position: relative;
    .icon {
      position: absolute;
      left: 0;
      margin: 0 !important;
      text-align: center;
      top: 8px;
      width: 100%;

      .fa,
      .fas {
        font-size: 18px;
      }
    }
  }
  &.field-addon-right {
    margin-top: -5px;

    > .icon {
      width: 60px;
      height: 38px;
      position: relative;
      top: initial;
      left: initial;
      border: 1px solid $inputBorderColour;
      background-color: $page-bg-light;
      border-radius: 0 $inputBorderRadius $inputBorderRadius 0;
    }
  }

  /*
* Button icon colours
*/
  &.has-icons-left,
  &.has-icons-right {
    .button {
      & ~ .icon {
        color: $input-border-light;
      }

      &.is-link ~ .icon {
        color: $page-bg-light;
      }

      &.as-link ~ .icon {
        color: $input-border-light;
      }
      &.fundraising,
      &.donations,
      &.volunteering {
        & ~ .icon {
          color: $page-bg-light;
        }
      }
    }
    .icon {
      color: $icon-default;
      &.password-toggle {
        color: $input-border-light;
      }
    }
  }
  &.icon-only .icon {
    color: $input-border-light;
  }

  .button {
    // border-radius: $button-border-radius;
    font-size: 14px;
    line-height: 1.3333%;
    height: 40px;

    &:hover:not([disabled]) {
      background-color: $input-bg-active-light;
    }

    &.is-link {
      background-color: $input-border-light;
      &:hover:not([disabled]) {
        background-color: $input-bg-active-light;
      }
    }

    &.as-link {
      background-color: $page-bg-light;
      border-color: transparent;
      padding-left: 0;
      padding-right: 0;

      &:hover:not([disabled]),
      &:focus:not([disabled]) {
        background-color: transparent;
        text-decoration: underline;
        box-shadow: none;
      }

      &.has-icons {
        &-left {
          padding-left: 40px;
        }
        &-right {
          padding-right: 35px;
        }
      }

      & ~ .is-left {
        left: 0 !important;
      }

      & ~ .is-right {
        right: 0 !important;
      }
    }

    &-nav-arrow {
      background-color: transparent;
      border: none;
      width: auto;
      height: auto;
      padding: 8px 0;

      &:hover:not([disabled]),
      &:focus:not([disabled]) {
        background-color: transparent;
        text-decoration: underline;
        box-shadow: none;
      }

      .icon {
        position: relative;
      }

      &_light {
        .icon {
          color: $page-bg-light;
          .fa {
            font-size: 14px;
          }
        }
      }
    }

    & ~ .loader-wrapper {
      border-radius: $button-loading-radius;
    }

    &.has-icons {
      &-left {
        padding-left: 45px;
      }
      &-right {
        padding-right: 45px;
      }
    }

    &.icon-only {
      padding: 0 50px;
    }

    &.has-icons-left,
    &.has-icons-right {
      & ~ .icon {
        opacity: 1 !important;
        top: 1px;

        display: flex;
        align-content: center;
        align-items: center;

        &.is-left {
          left: 12px;
        }

        &.is-right {
          right: 5px;
        }

        .fa,
        .fas {
          width: 100%;
          text-align: center;
        }
      }
    }

    &.flat {
      border-color: transparent;
    }

    &:disabled {
      &.has-icons-left,
      &.has-icons-right {
        & ~ .icon {
          opacity: 0.4 !important;
        }
      }
    }

    &.dialog-close-btn {
      display: flex;
      height: auto;
      width: auto;
      padding: 0;

      .icon {
        height: 18px;
        width: 18px;
        position: relative;
        left: auto;
        top: auto;
        margin: 4px !important;
      }
    }
  }
}
</style>
