from flask import render_template,send_from_directory
from .. import cache
from . import main

@cache.cached(timeout=50)
@main.route('/')
def home():
    return render_template('index.html', title='Welcome')


@cache.cached(timeout=50)
@main.route("/about")
def about():
    return render_template('about.html')


@cache.cached(timeout=50)
@main.route('/contact')
def contacts():
    return render_template('contact.html')



# for DEBUGGING
from os import path


def to_tmp_file(_path, _filename):
    _file = path.join(path.abspath(path.dirname('.')), '.tmp', _path, _filename)
    return main.send_static_file(_file)


def send_to_tmp(_folder, _filename):
    _path = path.join(path.abspath(path.dirname('.')), '.tmp', _folder)
    return send_from_directory(_path, _filename)


@main.route('/images/<path:filename>')
def temp_images(filename):
    _path = path.join(path.abspath(path.dirname('.')), 'dist', 'app', 'static', 'images')
    return send_from_directory(_path, filename)

@main.route('/fonts/<path:filename>')
def temp_fonts(filename):
    _path = path.join(path.abspath(path.dirname('.')), 'dist', 'app', 'static', 'fonts')
    return send_from_directory(_path, filename)


@main.route('/scripts/<path:filename>')
def temp_scripts(filename):
    return send_to_tmp('scripts', filename)
    # return to_tmp_file('scripts', filename)


@main.route('/styles/<path:filename>')
def temp_styles(filename):
    return send_to_tmp('styles', filename)
    # return to_tmp_file('styles', filename)


@main.route('/bower_components/<path:filename>')
def temp_bower(filename):
    _path = path.join(path.abspath(path.dirname('.')), 'bower_components')
    return send_from_directory(_path, filename)