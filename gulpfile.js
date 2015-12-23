/*
 * 参考: http://2inc.org/blog/2015/05/13/4818/
 */

/*
 * modules load
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watchify = require('watchify');

/*
 * paths
 */
var jsSrcPath = './src/';
var jsSrcFile = 'app.js';
var jsDestPath = './dist/';

/*
 * tasks
 */

/**
 * browserify
 */
gulp.task( 'browserify', function() {
    return jscompile( false );
});

/**
 * watchify
 */
gulp.task( 'watchify', function() {
    return jscompile( true );
});

/**
 * jscompile function
 */
function jscompile( is_watch ) {
    var bundler;
    var props = {
        entries: jsSrcPath + jsSrcFile,
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    };
    if ( is_watch ) {
        bundler = watchify( browserify( props ) );
    } else {
        bundler = browserify( props );
    }

    function rebundle() {
        console.log("rebundle");

        return bundler
            .pipe( source( jsSrcFile ) )
            .pipe(gulp.dest( jsDestPath ) )
            .on('end', function() {
                reload();
            });
    }
    bundler.on( 'update', function() {
        rebundle();
    } );
    bundler.on( 'log', function( message ) {
        console.log( message );
    } );
    return rebundle();
}

gulp.task('srccopy', function() {
    return gulp
        .pipe( source( jsSrcFile ) )
        .pipe(gulp.dest( jsDestPath ) )
        .on('end', function() {
            reload();
        });
});

/*
 * 実行時に必要なファイルをコピー
 */
gulp.task('plugins', function() {
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap*.min.css')
        .pipe(gulp.dest('dist/css'));
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('dist/plugins'));
    gulp.src('./node_modules/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
    gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/plugins'));
    gulp.src('./node_modules/encoding-japanese/encoding.min.js')
        .pipe(gulp.dest('dist/plugins'));
});

// 監視タスクを作成
gulp.task('watch', ['plugins'], function() {
    browserSync({
        notify: false,
        logPrefix: 'BS',
        server: ['./dist/']
    });
    gulp.watch(jsDestPath+'index.html', reload);
    gulp.watch(jsSrcPath+jsSrcFile, ['srccopy']);
});

gulp.task('buildBundle', ['plugins','browserify'], function(){

});

gulp.task('default', ['buildBundle']);
