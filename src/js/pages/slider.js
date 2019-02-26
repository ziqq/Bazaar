// $(document).ready(function() {
//     //Slick Slider https://kenwheeler.github.io/slick/

//     //Slider Card
//     if (
//         $('.js-bz-slider--card').length &&
//         $('.js-bz-slider--card-nav').length
//     ) {
//         cardSlider();
//     }

//     if (
//         $('.js-bz-slider--card-modal').length &&
//         $('.js-bz-slider--card-nav-modal').length
//     ) {
//         modalSlider();
//     }

//     //Slider Promo
//     if ($('.js-bz-slider--promo').length) {
//         $('.js-bz-slider--promo').slick({
//             nextArrow: '.bz-slider-promo__arrow--next',
//             prevArrow: '.bz-slider-promo__arrow--prev',
//             arrows: true,
//             infinite: true,
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             speed: 500,
//             autoplaySpeed: 5000,
//             autoplay: true,
//             dots: true
//         });
//     }

//     //Slider Related
//     if ($('.js-bz-slider--related').length) {
//         sliderRelated();
//     }
//     if ($('.js-bz-slider--related-modal').length) {
//         sliderRelatedModal();
//     }
// });

//CardSliderFunction
// function cardSlider() {
//     $('.js-bz-slider--card').slick({
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false,
//         fade: true,
//         asNavFor: '.js-bz-slider--card-nav',
//         responsive: [
//             {
//                 breakpoint: 481,
//                 settings: {
//                     dots: true,
//                     fade: false
//                 }
//             }
//         ]
//     });
//     $('.js-bz-slider--card-nav').slick({
//         slidesToShow: 7,
//         slidesToScroll: 1,
//         asNavFor: '.js-bz-slider--card',
//         dots: true,
//         // centerMode: true,
//         focusOnSelect: true,
//         responsive: [
//             {
//                 breakpoint: 1025,
//                 settings: {
//                     centerMode: false
//                 }
//             },
//             {
//                 breakpoint: 481,
//                 settings: 'unslick'
//             }
//         ]
//     });
// }

// function modalSlider() {
//     $('.js-bz-slider--card-modal').slick({
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false,
//         fade: true,
//         asNavFor: '.js-bz-slider--card-nav-modal',
//         responsive: [
//             {
//                 breakpoint: 481,
//                 settings: {
//                     dots: true,
//                     fade: false
//                 }
//             }
//         ]
//     });
//     $('.js-bz-slider--card-nav-modal').slick({
//         slidesToShow: 7,
//         slidesToScroll: 1,
//         asNavFor: '.js-bz-slider--card-modal',
//         dots: true,
//         // centerMode: true,
//         focusOnSelect: true,
//         responsive: [
//             {
//                 breakpoint: 1025,
//                 settings: {
//                     centerMode: false
//                 }
//             },
//             {
//                 breakpoint: 481,
//                 settings: 'unslick'
//             }
//         ]
//     });
// }

//sliderRelated
// function sliderRelated() {
//     $('.js-bz-slider--related').slick({
//         arrows: true,
//         infinite: true,
//         slidesToShow: 8,
//         slidesToScroll: 1,
//         speed: 500,
//         autoplaySpeed: 5000,
//         autoplay: true,
//         dots: false,
//         responsive: [
//             {
//                 breakpoint: 1025,
//                 settings: {
//                     slidesToShow: 6
//                 }
//             },
//             {
//                 breakpoint: 769,
//                 settings: {
//                     slidesToShow: 5
//                 }
//             },
//             {
//                 breakpoint: 481,
//                 settings: {
//                     slidesToShow: 3
//                 }
//             },
//             {
//                 breakpoint: 376,
//                 settings: {
//                     slidesToShow: 2
//                 }
//             }
//         ]
//     });
// }

// function sliderRelatedModal() {
//     $('.js-bz-slider--related-modal').slick({
//         arrows: true,
//         infinite: true,
//         slidesToShow: 8,
//         slidesToScroll: 1,
//         speed: 500,
//         autoplaySpeed: 5000,
//         autoplay: true,
//         dots: false,
//         responsive: [
//             {
//                 breakpoint: 1025,
//                 settings: {
//                     slidesToShow: 6
//                 }
//             },
//             {
//                 breakpoint: 769,
//                 settings: {
//                     slidesToShow: 5
//                 }
//             },
//             {
//                 breakpoint: 481,
//                 settings: {
//                     slidesToShow: 3
//                 }
//             },
//             {
//                 breakpoint: 376,
//                 settings: {
//                     slidesToShow: 2
//                 }
//             }
//         ]
//     });
// }
